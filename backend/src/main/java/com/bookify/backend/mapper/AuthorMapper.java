package com.bookify.backend.mapper;

import com.bookify.backend.api.external.AuthorDTO;
import com.bookify.backend.api.internal.Author;
import org.springframework.stereotype.Component;

@Component
public class AuthorMapper {
    public AuthorDTO map(Author author) {
        return new AuthorDTO()
                .setId(author.getId())
                .setFirstName(author.getFirstName())
                .setLastName(author.getLastName());
    }

    public Author map(AuthorDTO author) {
        return new Author()
                .setFirstName(author.getFirstName())
                .setLastName(author.getLastName());
    }
}
