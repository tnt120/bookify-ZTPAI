package com.bookify.backend.mapper;

import com.bookify.backend.api.external.response.AuthorResponse;
import com.bookify.backend.api.internal.Author;
import org.springframework.stereotype.Component;

@Component
public class AuthorMapper {
    public AuthorResponse map(Author author) {
        return new AuthorResponse()
                .setId(author.getId())
                .setFirstName(author.getFirstName())
                .setLastName(author.getLastName());
    }

    public Author map(AuthorResponse author) {
        return new Author()
                .setFirstName(author.getFirstName())
                .setLastName(author.getLastName());
    }
}
