package com.lerneon.backend.controllers.implementations;

import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lerneon.backend.jobs.producer.DirectProducer;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/queue")
@AllArgsConstructor
public class TestQueueController {
    private final DirectProducer directProducer;

    @GetMapping("/direct")
    public String sendMessage() {
        Message message = MessageBuilder.withBody("hello rabbitmq".getBytes())
                .setContentType("text/plain").build();
        directProducer.produce(message);
        return "Message sent!";
    }
}
