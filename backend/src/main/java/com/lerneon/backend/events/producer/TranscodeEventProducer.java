package com.lerneon.backend.events.producer;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import com.lerneon.backend.models.enums.VideoResolution;
import com.lerneon.backend.models.event.TranscodeEvent;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TranscodeEventProducer {
        private final RabbitTemplate rabbitTemplate;

        public void publishLowResolutionEvent(TranscodeEvent transcodeEvent) {
                rabbitTemplate.convertAndSend(
                                "transcode.exchange",
                                "transcode.video.low-resolution",
                                transcodeEvent.toBuilder()
                                                .videoResolution(VideoResolution.LOW)
                                                .build());
        }

        public void publishMediumResolutionEvent(TranscodeEvent transcodeEvent) {
                rabbitTemplate.convertAndSend(
                                "transcode.exchange",
                                "transcode.video.medium-resolution",
                                transcodeEvent.toBuilder()
                                                .videoResolution(VideoResolution.MEDIUM)
                                                .build());
        }

        public void publishHighResolutionEvent(TranscodeEvent transcodeEvent) {
                rabbitTemplate.convertAndSend(
                                "transcode.exchange",
                                "transcode.video.high-resolution",
                                transcodeEvent.toBuilder()
                                                .videoResolution(VideoResolution.HIGH)
                                                .build());
        }

        public void publishTranscodeRetryEvent(TranscodeEvent transcodeEvent) {
                rabbitTemplate.convertAndSend(
                                "transcode.exchange",
                                "transcode.retry",
                                transcodeEvent);
        }

        public void publishTranscodeCompleteEvent(TranscodeEvent transcodeEvent) {
                rabbitTemplate.convertAndSend(
                                "transcode.exchange",
                                "transcode.complete",
                                transcodeEvent);
        }
}
