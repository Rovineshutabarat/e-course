package com.lerneon.backend.jobs.producer;

import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class DirectProducer {
    private final RabbitTemplate rabbitTemplate;

    public void produce(Message message) {
        rabbitTemplate.send("queue", message);
    }
}
