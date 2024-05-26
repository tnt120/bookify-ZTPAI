package com.bookify.backend.kafka;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.List;

@Data
@Accessors(chain = true)
public class KafkaReceiveModel {
    private String strategy;
    private List<String> emails;
    private Integer commentId;
    private String subject;
    private String book;
}
