package com.bookify.backend.kafka;

import com.bookify.backend.service.impl.EmailService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;

import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class KafkaListeners {

    private static final ObjectMapper objectMapper = new ObjectMapper();
    private final EmailService emailService;
    private final Map<String, String> templateDispatcher;

    @SneakyThrows
    @KafkaListener(topics = "mails", groupId = "1")
    void listener(String message) throws JsonProcessingException {
        KafkaReceiveModel kafkaReceiveModel = objectMapper.readValue(message, KafkaReceiveModel.class);
        log.info("Received message: {}", kafkaReceiveModel);

        Context context = new Context();
        context.setVariable("commentId", kafkaReceiveModel.getCommentId());
        context.setVariable("link", "http://localhost:8080/mailVerify/" + kafkaReceiveModel.getCommentId());

        emailService.sendHtmlEmailToMultiple(
                kafkaReceiveModel.getEmails(),
                kafkaReceiveModel.getSubject(),
                templateDispatcher.get(kafkaReceiveModel.getStrategy()),
                context
        );
    }
}
