package com.lerneon.backend.events.producer;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import com.lerneon.backend.models.event.TranscodeEvent;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TranscodeEventProducer {
    private final RabbitTemplate rabbitTemplate;

    public void sendLowResolutionEvent(TranscodeEvent transcodeEvent) {
        rabbitTemplate.convertAndSend(
                "transcode.exchange",
                "transcode.video.low-resolution",
                transcodeEvent);
    }

    public void sendMediumResolutionEvent(TranscodeEvent transcodeEvent) {
        rabbitTemplate.convertAndSend(
                "transcode.exchange",
                "transcode.video.medium-resolution",
                transcodeEvent);
    }

    public void sendHighResolutionEvent(TranscodeEvent transcodeEvent) {
        rabbitTemplate.convertAndSend(
                "transcode.exchange",
                "transcode.video.high-resolution",
                transcodeEvent);
    }

    public void sendTranscodeCompleteEvent(TranscodeEvent transcodeEvent) {
        rabbitTemplate.convertAndSend(
                "transcode.exchange",
                "transcode.video.complete",
                transcodeEvent);
    }

}
