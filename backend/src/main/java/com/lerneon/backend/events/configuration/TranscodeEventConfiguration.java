package com.lerneon.backend.events.configuration;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TranscodeEventConfiguration {

    private static final String TRANSCODE_EXCHANGE_NAME = "transcode.exchange";

    private static final String LOW_RESOLUTION_QUEUE = "transcode.video.low-resolution-queue";
    private static final String MEDIUM_RESOLUTION_QUEUE = "transcode.video.medium-resolution-queue";
    private static final String HIGH_RESOLUTION_QUEUE = "transcode.video.high-resolution-queue";
    private static final String TRANSCODE_COMPLETE_QUEUE = "transcode.video.complete-queue";

    private static final String LOW_RESOLUTION_ROUTING_KEY = "transcode.video.low-resolution";
    private static final String MEDIUM_RESOLUTION_ROUTING_KEY = "transcode.video.medium-resolution";
    private static final String HIGH_RESOLUTION_ROUTING_KEY = "transcode.video.high-resolution";
    private static final String TRANSCODE_COMPLETE_ROUTING_KEY = "transcode.video.complete";

    @Bean
    TopicExchange transcodeExchange() {
        return new TopicExchange(TRANSCODE_EXCHANGE_NAME);
    }

    @Bean
    Queue lowResolutionTranscodeQueue() {
        return QueueBuilder.durable(LOW_RESOLUTION_QUEUE).build();
    }

    @Bean
    Queue mediumResolutionTranscodeQueue() {
        return QueueBuilder.durable(MEDIUM_RESOLUTION_QUEUE).build();
    }

    @Bean
    Queue highResolutionTranscodeQueue() {
        return QueueBuilder.durable(HIGH_RESOLUTION_QUEUE).build();
    }

    @Bean
    Queue transcodeCompleteQueue() {
        return QueueBuilder.durable(TRANSCODE_COMPLETE_QUEUE).build();
    }

    @Bean
    Binding lowResolutionTranscodeBinding() {
        return BindingBuilder.bind(lowResolutionTranscodeQueue())
                .to(transcodeExchange())
                .with(LOW_RESOLUTION_ROUTING_KEY);
    }

    @Bean
    Binding mediumResolutionTranscodeBinding() {
        return BindingBuilder.bind(mediumResolutionTranscodeQueue())
                .to(transcodeExchange())
                .with(MEDIUM_RESOLUTION_ROUTING_KEY);
    }

    @Bean
    Binding highResolutionTranscodeBinding() {
        return BindingBuilder.bind(highResolutionTranscodeQueue())
                .to(transcodeExchange())
                .with(HIGH_RESOLUTION_ROUTING_KEY);
    }

    @Bean
    Binding transcodeCompleteBinding() {
        return BindingBuilder.bind(transcodeCompleteQueue())
                .to(transcodeExchange())
                .with(TRANSCODE_COMPLETE_ROUTING_KEY);
    }
}