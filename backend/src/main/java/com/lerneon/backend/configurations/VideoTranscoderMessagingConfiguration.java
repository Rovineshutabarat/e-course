package com.lerneon.backend.configurations;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.ExchangeBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// pub/sub (Fanout exchange) -> 1 Producer -> 1 Exchange -> Banyak Queue -> Banyak Consumer.
// Work queue -> 1 Producer -> 1 Queue -> Banyak Consumer

@Configuration
public class VideoTranscoderMessagingConfiguration {
    private final String EXCHANGE_NAME = "transcoder.exchange";
    private final String QUEUE_360p_NAME = "transcode.360p";
    private final String QUEUE_480p_NAME = "transcode.480p";
    private final String QUEUE_720p_NAME = "transcode.720p";
    private final String ROUTING_KEY = "transcode.#";

    @Bean
    TopicExchange exchange() {
        return ExchangeBuilder.topicExchange(EXCHANGE_NAME).durable(false).build();

    }

    @Bean
    Queue queue360p() {
        return QueueBuilder.durable(QUEUE_360p_NAME).build();
    }

    @Bean
    Queue queue480p() {
        return QueueBuilder.durable(QUEUE_480p_NAME).build();
    }

    @Bean
    Queue queue720p() {
        return QueueBuilder.durable(QUEUE_720p_NAME).build();
    }

    @Bean
    Binding binding360p() {
        return BindingBuilder.bind(queue360p()).to(exchange()).with(ROUTING_KEY);
    }

    @Bean
    Binding binding480p() {
        return BindingBuilder.bind(queue480p()).to(exchange()).with(ROUTING_KEY);
    }

    @Bean
    Binding binding720p() {
        return BindingBuilder.bind(queue720p()).to(exchange()).with(ROUTING_KEY);
    }
}
