package com.lerneon.backend.events.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import com.lerneon.backend.events.producer.TranscodeEventProducer;
import com.lerneon.backend.models.entity.Resource;
import com.lerneon.backend.models.entity.TranscodeEvent;
import com.lerneon.backend.models.enums.TranscodeStatus;
import com.lerneon.backend.models.enums.VideoResolution;
import com.lerneon.backend.models.exceptions.TranscodeException;
import com.lerneon.backend.services.ResourceService;
import com.lerneon.backend.services.TranscodeEventService;
import com.lerneon.backend.services.TranscodeService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TranscodeEventConsumer {
    private final TranscodeService transcodeService;
    private final ResourceService resourceService;
    private final TranscodeEventProducer transcodeEventProducer;
    private final TranscodeEventService transcodeEventService;

    @RabbitListener(queues = "transcode.video.low-resolution-queue")
    public void receiveLowResolutionEvent(TranscodeEvent transcodeEvent) {
        TranscodeStatus transcodeStatus = transcodeService.transcode(
                transcodeEventService.createTranscodeEvent(transcodeEvent, TranscodeStatus.PROCESSING));

        if (transcodeStatus.equals(TranscodeStatus.FAILED)) {
            throw new TranscodeException("Failed to transcode video");
        }
        transcodeService.createMasterPlaylist(transcodeEvent);
        transcodeEventService.updateStatus(transcodeEvent.getId(), transcodeStatus);

        transcodeEventProducer.sendMediumResolutionEvent(
                TranscodeEvent.builder()
                        .source(transcodeEvent.getSource())
                        .destination(transcodeEvent.getDestination())
                        .videoResolution(VideoResolution.MEDIUM)
                        .resource(transcodeEvent.getResource())
                        .build());

        transcodeEventProducer.sendHighResolutionEvent(
                TranscodeEvent.builder()
                        .source(transcodeEvent.getSource())
                        .destination(transcodeEvent.getDestination())
                        .videoResolution(VideoResolution.HIGH)
                        .resource(transcodeEvent.getResource())
                        .build());
    }

    @RabbitListener(queues = "transcode.video.medium-resolution-queue")
    public void receiveMediumResolutionEvent(TranscodeEvent transcodeEvent) {
        TranscodeStatus transcodeStatus = transcodeService.transcode(
                transcodeEventService.createTranscodeEvent(transcodeEvent, TranscodeStatus.PROCESSING));

        if (transcodeStatus.equals(TranscodeStatus.FAILED)) {
            throw new TranscodeException("Failed to transcode video");
        }

        transcodeService.createMasterPlaylist(transcodeEvent);
        transcodeEventService.updateStatus(transcodeEvent.getId(), transcodeStatus);

        if (transcodeEventService.checkTranscodeEventStatus(transcodeEvent.getResource().getId())) {
            transcodeEventProducer.sendTranscodeCompleteEvent(transcodeEvent);
        }
    }

    @RabbitListener(queues = "transcode.video.high-resolution-queue")
    public void receiveHighResolutionEvent(TranscodeEvent transcodeEvent) {
        TranscodeStatus transcodeStatus = transcodeService.transcode(transcodeEventService
                .createTranscodeEvent(transcodeEvent, TranscodeStatus.PROCESSING));

        if (transcodeStatus.equals(TranscodeStatus.FAILED)) {
            throw new TranscodeException("Failed to transcode video");
        }

        transcodeService.createMasterPlaylist(transcodeEvent);
        transcodeEventService.updateStatus(transcodeEvent.getId(), transcodeStatus);

        if (transcodeEventService.checkTranscodeEventStatus(transcodeEvent.getResource().getId())) {
            transcodeEventProducer.sendTranscodeCompleteEvent(transcodeEvent);
        }
    }

    @RabbitListener(queues = "transcode.video.complete-queue")
    public void receiveTranscodeCompleteEvent(TranscodeEvent transcodeEvent) {
        Resource resource = resourceService.findResourceById(transcodeEvent.getResource().getId());

        resource.setUrl(transcodeEvent.getDestination()
                .concat("/")
                .concat("master.m3u8"));
        resource.setIsAvailabe(true);
        resourceService.saveResource(resource);
    }
}
