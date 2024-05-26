package com.bookify.backend.mapper;

import com.bookify.backend.api.external.response.BookcaseTypeResponse;
import com.bookify.backend.api.internal.BookcaseType;
import org.springframework.stereotype.Component;

@Component
public class BookcaseTypeMapper {

    public BookcaseTypeResponse map(BookcaseType bookcaseType) {
        return new BookcaseTypeResponse()
                .setId(bookcaseType.getId())
                .setName(bookcaseType.getName());
    }
}
