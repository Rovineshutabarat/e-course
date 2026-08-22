package com.lerneon.backend.events.producer;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import com.lerneon.backend.models.event.MailEvent;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MailProducer {
    private final RabbitTemplate rabbitTemplate;

    public void sendEmail(MailEvent mailEvent) {
        rabbitTemplate.convertAndSend("mail.exchange", "mail.send", mailEvent);
    }
}
