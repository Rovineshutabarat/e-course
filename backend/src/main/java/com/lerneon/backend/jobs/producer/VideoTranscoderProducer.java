package com.lerneon.backend.jobs.producer;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lerneon.backend.jobs.payload.VideoTranscoderPayload;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class VideoTranscoderProducer {
    private final RabbitTemplate rabbitTemplate;
    private final ObjectMapper objectMapper;

    public void transcode(VideoTranscoderPayload payload) {
        try {
            String message = objectMapper.writeValueAsString(payload);
            rabbitTemplate.convertAndSend("transcoder.exchange", "transcode", message);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Gagal konversi payload video ke JSON", e);
        }
    }
}
