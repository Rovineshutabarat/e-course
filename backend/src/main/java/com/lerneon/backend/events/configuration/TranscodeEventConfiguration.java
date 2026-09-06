package com.lerneon.backend.events.configuration;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.core.QueueBuilder.Overflow;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TranscodeEventConfiguration {

    private static final String TRANSCODE_TOPIC_EXCHANGE = "transcode.exchange";
    private static final String TRANSCODE_DEAD_LETTER_EXCHANGE = "transcode.dlx";

    private static final String LOW_RESOLUTION_QUEUE = "transcode.video.low-resolution";
    private static final String MEDIUM_RESOLUTION_QUEUE = "transcode.video.medium-resolution";
    private static final String HIGH_RESOLUTION_QUEUE = "transcode.video.high-resolution";
    private static final String TRANSCODE_RETRY_QUEUE = "transcode.retry";
    private static final String TRANSCODE_COMPLETE_QUEUE = "transcode.complete";

    private static final String LOW_RESOLUTION_DLQ = "transcode.video.low-resolution.dlq";
    private static final String MEDIUM_RESOLUTION_DLQ = "transcode.video.medium-resolution.dlq";
    private static final String HIGH_RESOLUTION_DLQ = "transcode.video.high-resolution.dlq";
    private static final String TRANSCODE_RETRY_DLQ = "transcode.retry.dlq";
    private static final String TRANSCODE_COMPLETE_DLQ = "transcode.complete.dlq";

    private static final String LOW_RESOLUTION_ROUTING_KEY = "transcode.video.low-resolution";
    private static final String MEDIUM_RESOLUTION_ROUTING_KEY = "transcode.video.medium-resolution";
    private static final String HIGH_RESOLUTION_ROUTING_KEY = "transcode.video.high-resolution";
    private static final String TRANSCODE_RETRY_ROUTING_KEY = "transcode.retry";
    private static final String TRANSCODE_COMPLETE_ROUTING_KEY = "transcode.complete";

    private static final String LOW_RESOLUTION_DLQ_ROUTING_KEY = "transcode.video.low-resolution.dlq";
    private static final String MEDIUM_RESOLUTION_DLQ_ROUTING_KEY = "transcode.video.medium-resolution.dlq";
    private static final String HIGH_RESOLUTION_DLQ_ROUTING_KEY = "transcode.video.high-resolution.dlq";
    private static final String TRANSCODE_RETRY_DLQ_ROUTING_KEY = "transcode.retry.dlq";
    private static final String TRANSCODE_COMPLETE_DLQ_ROUTING_KEY = "transcode.complete.dlq";

    @Bean
    TopicExchange transcodeExchange() {
        return new TopicExchange(TRANSCODE_TOPIC_EXCHANGE);
    }

    @Bean
    DirectExchange transcodeDeadLetterExchange() {
        return new DirectExchange(TRANSCODE_DEAD_LETTER_EXCHANGE);
    }

    @Bean
    Queue lowResolutionTranscodeQueue() {
        return QueueBuilder.durable(LOW_RESOLUTION_QUEUE)
                .maxLength(50)
                .overflow(Overflow.rejectPublish)
                .deadLetterExchange(TRANSCODE_DEAD_LETTER_EXCHANGE)
                .deadLetterRoutingKey(LOW_RESOLUTION_DLQ_ROUTING_KEY)
                .lazy()
                .build();
    }

    @Bean
    Queue mediumResolutionTranscodeQueue() {
        return QueueBuilder.durable(MEDIUM_RESOLUTION_QUEUE)
                .maxLength(50)
                .overflow(Overflow.rejectPublish)
                .deadLetterExchange(TRANSCODE_DEAD_LETTER_EXCHANGE)
                .deadLetterRoutingKey(MEDIUM_RESOLUTION_DLQ_ROUTING_KEY)
                .lazy()
                .build();
    }

    @Bean
    Queue highResolutionTranscodeQueue() {
        return QueueBuilder.durable(HIGH_RESOLUTION_QUEUE)
                .maxLength(50)
                .overflow(Overflow.rejectPublish)
                .deadLetterExchange(TRANSCODE_DEAD_LETTER_EXCHANGE)
                .deadLetterRoutingKey(HIGH_RESOLUTION_DLQ_ROUTING_KEY)
                .lazy()
                .build();
    }

    @Bean
    Queue transcodeRetryQueue() {
        return QueueBuilder.durable(TRANSCODE_RETRY_QUEUE)
                .maxLength(100)
                .overflow(Overflow.rejectPublish)
                .deadLetterExchange(TRANSCODE_DEAD_LETTER_EXCHANGE)
                .deadLetterRoutingKey(TRANSCODE_RETRY_DLQ_ROUTING_KEY)
                .lazy()
                .build();
    }

    @Bean
    Queue transcodeCompleteQueue() {
        return QueueBuilder.durable(TRANSCODE_COMPLETE_QUEUE)
                .maxLength(100)
                .overflow(Overflow.rejectPublish)
                .deadLetterExchange(TRANSCODE_DEAD_LETTER_EXCHANGE)
                .deadLetterRoutingKey(TRANSCODE_COMPLETE_DLQ_ROUTING_KEY)
                .lazy()
                .build();
    }

    @Bean
    Queue lowResolutionTranscodeDeadLetterQueue() {
        return QueueBuilder.durable(LOW_RESOLUTION_DLQ)
                .maxLength(100)
                .overflow(Overflow.rejectPublish)
                .lazy()
                .build();
    }

    @Bean
    Queue mediumResolutionTranscodeDeadLetterQueue() {
        return QueueBuilder.durable(MEDIUM_RESOLUTION_DLQ)
                .maxLength(100)
                .overflow(Overflow.rejectPublish)
                .lazy()
                .build();
    }

    @Bean
    Queue highResolutionTranscodeDeadLetterQueue() {
        return QueueBuilder.durable(HIGH_RESOLUTION_DLQ)
                .maxLength(100)
                .overflow(Overflow.rejectPublish)
                .lazy()
                .build();
    }

    @Bean
    Queue transcodeCompleteDeadLetterQueue() {
        return QueueBuilder.durable(TRANSCODE_COMPLETE_DLQ)
                .maxLength(100)
                .overflow(Overflow.rejectPublish)
                .lazy()
                .build();
    }

    @Bean
    Queue transcodeRetryDeadLetterQueue() {
        return QueueBuilder.durable(TRANSCODE_RETRY_DLQ)
                .maxLength(100)
                .overflow(Overflow.rejectPublish)
                .lazy()
                .build();
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
    Binding transcodeRetryBinding() {
        return BindingBuilder.bind(transcodeRetryQueue())
                .to(transcodeExchange())
                .with(TRANSCODE_RETRY_ROUTING_KEY);
    }

    @Bean
    Binding transcodeCompleteBinding() {
        return BindingBuilder.bind(transcodeCompleteQueue())
                .to(transcodeExchange())
                .with(TRANSCODE_COMPLETE_ROUTING_KEY);
    }

    @Bean
    Binding lowResolutionTranscodeDlqBinding() {
        return BindingBuilder.bind(lowResolutionTranscodeDeadLetterQueue())
                .to(transcodeDeadLetterExchange())
                .with(LOW_RESOLUTION_DLQ_ROUTING_KEY);
    }

    @Bean
    Binding mediumResolutionTranscodeDlqBinding() {
        return BindingBuilder.bind(mediumResolutionTranscodeDeadLetterQueue())
                .to(transcodeDeadLetterExchange())
                .with(MEDIUM_RESOLUTION_DLQ_ROUTING_KEY);
    }

    @Bean
    Binding highResolutionTranscodeDlqBinding() {
        return BindingBuilder.bind(highResolutionTranscodeDeadLetterQueue())
                .to(transcodeDeadLetterExchange())
                .with(HIGH_RESOLUTION_DLQ_ROUTING_KEY);
    }

    @Bean
    Binding transcodeCompleteDlqBinding() {
        return BindingBuilder.bind(transcodeCompleteDeadLetterQueue())
                .to(transcodeDeadLetterExchange())
                .with(TRANSCODE_COMPLETE_DLQ_ROUTING_KEY);
    }

    @Bean
    Binding transcodeRetryDlqBinding() {
        return BindingBuilder.bind(transcodeRetryDeadLetterQueue())
                .to(transcodeDeadLetterExchange())
                .with(TRANSCODE_RETRY_DLQ_ROUTING_KEY);
    }
}