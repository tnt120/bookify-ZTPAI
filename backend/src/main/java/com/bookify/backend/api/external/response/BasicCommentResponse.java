package com.bookify.backend.api.external.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class BasicCommentResponse {
    private Integer id;
    private Integer userId;
    private String userFirstname;
    private LocalDateTime createdAt;
    private String content;
}
