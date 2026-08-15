package com.lerneon.backend.jobs.consumer;

import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@AllArgsConstructor
@Slf4j
public class DirectConsumer {

    @RabbitListener(queues = "queue")
    private void consumer(Message message) {
        try {
            Thread.sleep(5000); // ⏱️ delay 2 detik
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        log.info(message.getBody().toString());
    }
}
