package com.bookify.backend.api.external;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.time.LocalDate;

@Data
@Accessors(chain = true)
@NoArgsConstructor
public class RatingDTO {
    private Integer id;
    private int value;
    private UserDTO ratingAuthor;
    private LocalDate ratingDate;
}
