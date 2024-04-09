package com.bookify.backend.api.external;

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
    private UserDTO commentAuthor;
    private LocalDate commentDate;
}
