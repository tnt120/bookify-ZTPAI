package com.bookify.backend.api.external;

import com.bookify.backend.api.internal.User;
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
    private User ratingAuthor;
    private LocalDate ratingDate;
}
