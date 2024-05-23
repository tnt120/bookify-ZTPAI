package com.bookify.backend.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaListeners {

    @KafkaListener(topics = "mails", groupId = "1")
    void listener(String data) {
        System.out.println("Received from kafka: " + data);
    }
}
