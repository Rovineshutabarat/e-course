package com.lerneon.backend.events.configuration;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MailEventConfiguration {
    private static final String MAIL_EXCHANGE = "mail.exchange";

    private static final String MAIL_OTP_QUEUE = "mail.otp-queue";

    private static final String MAIL_OTP_ROUTING_KEY = "mail.otp";

    @Bean
    TopicExchange mailExchange() {
        return new TopicExchange(MAIL_EXCHANGE);
    }

    @Bean
    Queue mailOneTimePasswordQueue() {
        return QueueBuilder.durable(MAIL_OTP_QUEUE).build();
    }

    @Bean
    Binding mailOneTimePasswordBinding() {
        return BindingBuilder.bind(mailOneTimePasswordQueue()).to(mailExchange())
                .with(MAIL_OTP_ROUTING_KEY);
    }

}