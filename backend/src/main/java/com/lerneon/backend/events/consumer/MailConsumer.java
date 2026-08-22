package com.lerneon.backend.events.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import com.lerneon.backend.models.event.MailEvent;
import com.lerneon.backend.services.MailService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class MailConsumer {
    private final MailService mailService;

    @RabbitListener(queues = "mail.send-queue")
    public void sendEmail(MailEvent mailEvent) {
        mailService.sendMail(mailEvent);
    }
}
