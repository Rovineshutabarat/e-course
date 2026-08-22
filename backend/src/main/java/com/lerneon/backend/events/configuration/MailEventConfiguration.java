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

    private static final String MAIL_ACCOUNT_VERIFICATION_QUEUE = "mail.account.verification.queue";

    private static final String MAIL_ACCOUNT_VERIFICATION_ROUTING_KEY = "mail.account.verification";


    @Bean
    TopicExchange mailExchange() {
        return new TopicExchange(MAIL_EXCHANGE);
    }

    @Bean
    Queue mailAccountVerificationQueue() {
        return QueueBuilder.durable(MAIL_ACCOUNT_VERIFICATION_QUEUE).build();
    }

    @Bean
    Binding mailAccountVerificationBinding() {
        return BindingBuilder.bind(mailAccountVerificationQueue()).to(mailExchange())
                .with(MAIL_ACCOUNT_VERIFICATION_ROUTING_KEY);
    }

}
