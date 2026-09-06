package com.lerneon.backend.events.consumer;

import java.io.IOException;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.support.AmqpHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Service;

import com.lerneon.backend.events.producer.TranscodeEventProducer;
import com.lerneon.backend.models.entity.TranscodeLog;
import com.lerneon.backend.models.enums.TranscodeStatus;
import com.lerneon.backend.models.event.TranscodeEvent;
import com.lerneon.backend.models.exceptions.TranscodeFatalException;
import com.lerneon.backend.models.exceptions.TranscodeRetryableException;
import com.lerneon.backend.services.ResourceService;
import com.lerneon.backend.services.TranscodeLogService;
import com.lerneon.backend.services.TranscodeService;
import com.lerneon.backend.services.UploadVideoService;
import com.rabbitmq.client.Channel;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class TranscodeEventConsumer {
    private final TranscodeLogService transcodeLogService;
    private final ResourceService resourceService;
    private final TranscodeService transcodeService;
    private final TranscodeEventProducer transcodeEventProducer;
    private final UploadVideoService uploadVideoService;

    private final Integer MAX_RETRY_ATTEMPT = 3;

    @RabbitListener(queues = "transcode.video.low-resolution", id = "LowResolutionEvent", ackMode = "MANUAL", concurrency = "1-2")
    public void receiveLowResolutionEvent(
            TranscodeEvent transcodeEvent,
            Channel channel,
            @Header(AmqpHeaders.DELIVERY_TAG) long deliveryTag) throws IOException {
        processTranscode(transcodeEvent, channel, deliveryTag);
    }

    @RabbitListener(queues = "transcode.video.medium-resolution", id = "MediumResolutionEvent", ackMode = "MANUAL", concurrency = "1-2")
    public void receiveMediumResolutionEvent(
            TranscodeEvent transcodeEvent,
            Channel channel,
            @Header(AmqpHeaders.DELIVERY_TAG) long deliveryTag) throws IOException {
        processTranscode(transcodeEvent, channel, deliveryTag);
    }

    @RabbitListener(queues = "transcode.video.high-resolution", id = "HighResolutionEvent", ackMode = "MANUAL", concurrency = "1-2")
    public void receiveHighResolutionEvent(
            TranscodeEvent transcodeEvent,
            Channel channel,
            @Header(AmqpHeaders.DELIVERY_TAG) long deliveryTag) throws IOException {
        processTranscode(transcodeEvent, channel, deliveryTag);
    }

    @RabbitListener(queues = "transcode.complete", id = "TranscodeCompleteEvent", ackMode = "MANUAL")
    public void receiveTranscodeCompleteEvent(
            TranscodeEvent transcodeEvent,
            Channel channel,
            @Header(AmqpHeaders.DELIVERY_TAG) long deliveryTag) throws IOException {
        try {
            resourceService.activateResource(transcodeEvent.getResourceId());
            channel.basicAck(deliveryTag, false);
        } catch (Exception exception) {
            log.error("Unexpected error handling transcode.complete | resourceId={}",
                    transcodeEvent.getResourceId(), exception);
            channel.basicNack(deliveryTag, false, false);
        }
    }

    @RabbitListener(queues = "transcode.retry", id = "TranscodeRetryEvent", ackMode = "MANUAL")
    public void receiveTranscodeRetryEvent(
            TranscodeEvent transcodeEvent,
            Channel channel,
            @Header(AmqpHeaders.DELIVERY_TAG) long deliveryTag) throws IOException {
        try {
            transcodeLogService.updateStatus(transcodeEvent.getTranscodeLogId(), TranscodeStatus.RETRYING);

            String destination = transcodeService.getDestination(transcodeEvent);
            uploadVideoService.cleanDirectory(destination);

            requeueTranscodeEvent(transcodeEvent);

            channel.basicAck(deliveryTag, false);
        } catch (Exception exception) {
            log.error("Failed to process retry event | source={}", transcodeEvent.getSource(), exception);
            channel.basicNack(deliveryTag, false, false);
        }
    }

    private void processTranscode(
            TranscodeEvent transcodeEvent,
            Channel channel,
            Long deliveryTag) throws IOException {
        try {
            if (transcodeEvent.getTranscodeLogId() == null) {
                TranscodeLog transcodeLog = transcodeLogService.initTranscodeLog(transcodeEvent);
                transcodeEvent.setTranscodeLogId(transcodeLog.getId());
            }

            TranscodeStatus transcodeStatus = transcodeService.transcode(transcodeEvent);

            transcodeLogService.updateStatus(transcodeEvent.getTranscodeLogId(), transcodeStatus);
            transcodeService.createMasterPlaylist(transcodeEvent);

            if (transcodeLogService.isAllTranscodeCompleted(transcodeEvent.getResourceId())) {
                transcodeEventProducer.publishTranscodeCompleteEvent(transcodeEvent);
            }
            channel.basicAck(deliveryTag, false);

        } catch (TranscodeRetryableException exception) {
            handleRetryableFailure(transcodeEvent, channel, deliveryTag);
        } catch (TranscodeFatalException exception) {
            handleFatalFailure(transcodeEvent, channel, deliveryTag, exception);
        } catch (Exception exception) {
            log.error("Unexpected error while processing transcode | source={}",
                    transcodeEvent.getSource(), exception);
            if (transcodeEvent.getTranscodeLogId() != null) {
                transcodeLogService.updateStatus(transcodeEvent.getTranscodeLogId(), TranscodeStatus.FAILED);
                transcodeService.failEmitter(transcodeEvent.getTranscodeLogId());
            }
            channel.basicNack(deliveryTag, false, false);
        }
    }

    private void handleRetryableFailure(
            TranscodeEvent transcodeEvent,
            Channel channel,
            Long deliveryTag) throws IOException {
        int retryCount = transcodeEvent.getRetryCount();

        if (retryCount >= MAX_RETRY_ATTEMPT) {
            log.error("Max retry attempts exceeded | source={}", transcodeEvent.getSource());
            transcodeLogService.updateStatus(transcodeEvent.getTranscodeLogId(), TranscodeStatus.FAILED);

            transcodeService.failEmitter(transcodeEvent.getTranscodeLogId());
            channel.basicNack(deliveryTag, false, false);
            return;
        }

        log.warn("Retry attempt {} | source={}", retryCount + 1, transcodeEvent.getSource());
        transcodeEvent.setRetryCount(retryCount + 1);
        transcodeEventProducer.publishTranscodeRetryEvent(transcodeEvent);
        channel.basicAck(deliveryTag, false);
    }

    private void handleFatalFailure(
            TranscodeEvent transcodeEvent,
            Channel channel,
            Long deliveryTag,
            TranscodeFatalException exception) throws IOException {
        log.error("Fatal error | source={} | reason={}", transcodeEvent.getSource(), exception.getMessage());
        transcodeLogService.updateStatus(transcodeEvent.getTranscodeLogId(), TranscodeStatus.FAILED);

        transcodeService.failEmitter(transcodeEvent.getTranscodeLogId());
        channel.basicNack(deliveryTag, false, false);
    }

    private void requeueTranscodeEvent(TranscodeEvent transcodeEvent) {
        switch (transcodeEvent.getVideoResolution()) {
            case LOW -> transcodeEventProducer.publishLowResolutionEvent(transcodeEvent);
            case MEDIUM -> transcodeEventProducer.publishMediumResolutionEvent(transcodeEvent);
            case HIGH -> transcodeEventProducer.publishHighResolutionEvent(transcodeEvent);
            default -> log.error(
                    "Unknown video resolution, retry event dropped | resourceId={} resolution={}",
                    transcodeEvent.getResourceId(), transcodeEvent.getVideoResolution());
        }
    }
}