package com.bookify.backend.mapper;

import com.bookify.backend.api.external.BookDTO;
import com.bookify.backend.api.internal.Book;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BookMapper {
    private final GenreMapper genreMapper;
    private final AuthorMapper authorMapper;

    public BookDTO map(Book book) {
        return new BookDTO()
                .setId(book.getId())
                .setTitle(book.getTitle())
                .setAuthor(authorMapper.map(book.getAuthor()))
                .setGenre(genreMapper.map(book.getGenre()))
                .setCoverUrl(book.getCoverUrl());
    }
}
