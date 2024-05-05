package com.bookify.backend.api.external.response;

import com.bookify.backend.api.external.AuthorDTO;
import com.bookify.backend.api.external.GenreDTO;
import com.bookify.backend.api.external.RatingDTO;
import lombok.*;
import lombok.experimental.Accessors;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class BookResponse {
    private Integer id;
    private String title;
    private byte[] cover;
    private AuthorDTO author;
    private GenreDTO genre;
    private Integer pages;
    private LocalDate releaseDate;
    private String description;
    private Double avgRating;
}