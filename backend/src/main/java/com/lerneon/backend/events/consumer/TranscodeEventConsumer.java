package com.lerneon.backend.events.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import com.lerneon.backend.events.producer.TranscodeEventProducer;
import com.lerneon.backend.models.entity.Resource;
import com.lerneon.backend.models.entity.TranscodeLog;
import com.lerneon.backend.models.enums.TranscodeStatus;
import com.lerneon.backend.models.enums.VideoResolution;
import com.lerneon.backend.models.event.TranscodeEvent;
import com.lerneon.backend.models.exceptions.TranscodeException;
import com.lerneon.backend.services.ResourceService;
import com.lerneon.backend.services.TranscodeLogService;
import com.lerneon.backend.services.TranscodeService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TranscodeEventConsumer {
    private final TranscodeService transcodeService;
    private final ResourceService resourceService;
    private final TranscodeEventProducer transcodeEventProducer;
    private final TranscodeLogService transcodeLogService;

    @RabbitListener(queues = "transcode.video.low-resolution-queue")
    public void receiveLowResolutionEvent(TranscodeEvent transcodeEvent) {
        processTranscode(transcodeEvent);

        // transcodeEventProducer.sendMediumResolutionEvent(buildEvent(transcodeEvent,
        // VideoResolution.MEDIUM));
        // transcodeEventProducer.sendHighResolutionEvent(buildEvent(transcodeEvent,
        // VideoResolution.HIGH));
    }

    @RabbitListener(queues = "transcode.video.medium-resolution-queue")
    public void receiveMediumResolutionEvent(TranscodeEvent transcodeEvent) {
        processTranscode(transcodeEvent);
        checkAndSendCompleteEvent(transcodeEvent);
    }

    @RabbitListener(queues = "transcode.video.high-resolution-queue")
    public void receiveHighResolutionEvent(TranscodeEvent transcodeEvent) {
        processTranscode(transcodeEvent);
        checkAndSendCompleteEvent(transcodeEvent);
    }

    @RabbitListener(queues = "transcode.video.complete-queue")
    public void receiveTranscodeCompleteEvent(TranscodeEvent transcodeEvent) {
        Resource resource = resourceService.findResourceById(transcodeEvent.getResourceId());
        resource.setUrl(transcodeEvent.getDestination().concat("/").concat("master.m3u8"));
        resource.setIsAvailabe(true);
        resourceService.saveResource(resource);
    }

    private void processTranscode(TranscodeEvent transcodeEvent) {
        TranscodeLog transcodeLog = transcodeLogService.createTranscodeLog(TranscodeLog.builder()
                .source(transcodeEvent.getSource())
                .destination(transcodeEvent.getDestination())
                .videoResolution(transcodeEvent.getVideoResolution())
                .transcodeStatus(TranscodeStatus.PROCESSING)
                .resource(resourceService.findResourceById(transcodeEvent.getResourceId()))
                .build());

        TranscodeStatus transcodeStatus = transcodeService.transcode(transcodeEvent);

        if (transcodeStatus.equals(TranscodeStatus.FAILED)) {
            throw new TranscodeException("Failed to transcode video");
        }

        transcodeService.createMasterPlaylist(transcodeEvent);
        transcodeLogService.updateStatus(transcodeLog.getId(), transcodeStatus);
    }

    private void checkAndSendCompleteEvent(TranscodeEvent transcodeEvent) {
        if (transcodeLogService.checkTranscodeLogStatus(transcodeEvent.getResourceId())) {
            transcodeEventProducer.sendTranscodeCompleteEvent(transcodeEvent);
        }
    }

    private TranscodeEvent buildEvent(TranscodeEvent source, VideoResolution resolution) {
        return TranscodeEvent.builder()
                .source(source.getSource())
                .destination(source.getDestination())
                .videoResolution(resolution)
                .resourceId(source.getResourceId())
                .build();
    }
}