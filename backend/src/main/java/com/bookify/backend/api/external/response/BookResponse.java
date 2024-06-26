package com.bookify.backend.api.external.response;

import lombok.*;
import lombok.experimental.Accessors;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class BookResponse {
    private Integer id;
    private String title;
    private byte[] cover;
    private AuthorResponse author;
    private GenreResponse genre;
    private Integer pages;
    private LocalDate releaseDate;
    private String description;
    private Double avgRating;
    private List<BasicRatingResponse> ratings;
    private List<BasicCommentResponse> comments;
    private Integer commentCount;
}
