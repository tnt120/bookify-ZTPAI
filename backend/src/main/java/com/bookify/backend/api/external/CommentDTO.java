package com.bookify.backend.api.external;

import com.bookify.backend.api.internal.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class CommentDTO {
    private Integer id;
    private String content;
    private User commentAuthor;
    private LocalDate commentDate;
}
