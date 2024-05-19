package com.bookify.backend.mapper;

import com.bookify.backend.api.external.response.BookBookcaseResponse;
import com.bookify.backend.api.internal.UserBook;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BookcaseMapper {
    private final BookcaseTypeMapper bookcaseTypeMapper;
    private final BookMapper bookMapper;

    public BookBookcaseResponse map(UserBook book) {
        return new BookBookcaseResponse()
                .setId(book.getId())
                .setBookcaseType(bookcaseTypeMapper.map(book.getBookcaseType()))
                .setCurrentPage(book.getCurrentPage())
                .setBook(bookMapper.mapToBookResponse(book.getBook()));
    }
}
