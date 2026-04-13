package com.lerneon.backend.jobs.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lerneon.backend.jobs.payload.VideoTranscoderPayload;
import com.lerneon.backend.models.enums.Resolution;
import com.lerneon.backend.services.VideoTranscoderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class VideoTranscoderConsumer {
    private final VideoTranscoderService videoTranscoderService;
    private final ObjectMapper objectMapper;

    @RabbitListener(queues = "transcode.360p", concurrency = "1-2")
    public void queue360p(String payload) throws JsonProcessingException {
        VideoTranscoderPayload videoTranscoderPayload =
                objectMapper.readValue(payload, VideoTranscoderPayload.class);
        videoTranscoderPayload.setResolution(Resolution.RES_360);

        videoTranscoderService.transcode360p(videoTranscoderPayload);
    }

    @RabbitListener(queues = "transcode.480p", concurrency = "1-2")
    public void queue480p(String payload) throws JsonProcessingException {
        VideoTranscoderPayload videoTranscoderPayload =
                objectMapper.readValue(payload, VideoTranscoderPayload.class);
        videoTranscoderPayload.setResolution(Resolution.RES_480);

        videoTranscoderService.transcode480p(videoTranscoderPayload);
    }

    @RabbitListener(queues = "transcode.720p", concurrency = "3-5")
    public void queue720p(String payload) throws JsonProcessingException {
        VideoTranscoderPayload videoTranscoderPayload =
                objectMapper.readValue(payload, VideoTranscoderPayload.class);
        videoTranscoderPayload.setResolution(Resolution.RES_720);

        videoTranscoderService.transcode720p(videoTranscoderPayload);
    }
}
