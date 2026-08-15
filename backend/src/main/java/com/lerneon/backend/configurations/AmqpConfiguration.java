package com.lerneon.backend.configurations;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.ExchangeBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.core.QueueBuilder.Overflow;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AmqpConfiguration {
    @Bean
    DirectExchange directExchange() {
        return ExchangeBuilder.directExchange("testdirect").durable(true).build();
    }

    @Bean
    Queue queue() {
        // max priority 1-10
        return QueueBuilder.durable("queue").maxLength(2).overflow(Overflow.rejectPublish).build();
    }

    @Bean
    Binding queueBinding() {
        return BindingBuilder.bind(queue()).to(directExchange()).with("testdirect");
    }
}
