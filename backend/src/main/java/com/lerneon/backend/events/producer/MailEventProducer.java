package com.lerneon.backend.events.producer;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import com.lerneon.backend.models.event.OneTimePasswordEvent;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MailEventProducer {
    private final RabbitTemplate rabbitTemplate;

    public void sendOneTimePasswordEvent(OneTimePasswordEvent oneTimePasswordEvent) {
        rabbitTemplate.convertAndSend("mail.exchange", "mail.otp", oneTimePasswordEvent);
    }
}
