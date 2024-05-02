package com.bookify.backend.mapper;

import com.bookify.backend.api.external.BookDTO;
import com.bookify.backend.api.external.requests.BookRequest;
import com.bookify.backend.api.internal.Author;
import com.bookify.backend.api.internal.Book;
import com.bookify.backend.api.internal.Genre;
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

    public Book map(BookRequest bookRequest, Author author, Genre genre) {
        return new Book()
                .setTitle(bookRequest.title())
                .setDescription(bookRequest.description())
                .setReleaseDate(bookRequest.releaseDate())
                .setPages(bookRequest.pages())
                .setAuthor(author)
                .setGenre(genre);

    }
}
