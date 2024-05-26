package com.bookify.backend.mapper;

import com.bookify.backend.api.external.response.GenreResponse;
import com.bookify.backend.api.internal.Genre;
import org.springframework.stereotype.Component;

@Component
public class GenreMapper {
    public GenreResponse map(Genre genre) {
        return new GenreResponse()
                .setId(genre.getId())
                .setName(genre.getName());
    }

    public Genre map(GenreResponse genreResponse) {
        return new Genre()
                .setId(genreResponse.getId())
                .setName(genreResponse.getName());
    }
}
