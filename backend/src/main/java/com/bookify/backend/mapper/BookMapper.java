package com.bookify.backend.mapper;

import com.bookify.backend.api.external.BookDTO;
import com.bookify.backend.api.internal.Book;
import org.springframework.stereotype.Component;

@Component
public class BookMapper {
    public BookDTO map(Book book) {
        return new BookDTO()
                .setId(book.getId())
                .setTitle(book.getTitle())
                .setDescription(book.getDescription());
    }

    public BookDTO mapWithPages(Book book) {
        return map(book).setPages(book.getPages());
    }
}
