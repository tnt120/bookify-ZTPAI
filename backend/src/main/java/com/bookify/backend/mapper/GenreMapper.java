package com.bookify.backend.mapper;

import com.bookify.backend.api.external.GenreDTO;
import com.bookify.backend.api.internal.Genre;
import org.springframework.stereotype.Component;

@Component
public class GenreMapper {
    public GenreDTO map(Genre genre) {
        return new GenreDTO()
                .setId(genre.getId())
                .setName(genre.getName());
    }

    public Genre map(GenreDTO genreDTO) {
        return new Genre()
                .setId(genreDTO.getId())
                .setName(genreDTO.getName());
    }
}
