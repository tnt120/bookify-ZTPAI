package com.bookify.backend.api.external;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.time.LocalDate;
import java.util.List;

@Data
@Accessors(chain = true)
@NoArgsConstructor
public class BookDTO {
    private Integer id;
    private String title;
    private String description;
    private String coverUrl;
    private LocalDate releaseDate;
    private Integer pages;
    private AuthorDTO author;
    private GenreDTO genre;
    private List<CommentDTO> comments;
    private List<RatingDTO> ratings;
}
