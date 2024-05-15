package com.bookify.backend.api.external.requests;

import java.time.LocalDate;

public record BookRequest (
        Integer id,
        String title,
        String description,
        Integer pages,
        LocalDate releaseDate,
        Integer authorId,
        Integer genreId
) {
}
