package com.bookify.backend.mapper;

import com.bookify.backend.api.external.BookcaseTypeDTO;
import com.bookify.backend.api.internal.BookcaseType;
import org.springframework.stereotype.Component;

@Component
public class BookcaseTypeMapper {

    public BookcaseTypeDTO map(BookcaseType bookcaseType) {
        return new BookcaseTypeDTO()
                .setId(bookcaseType.getId())
                .setName(bookcaseType.getName());
    }
}
