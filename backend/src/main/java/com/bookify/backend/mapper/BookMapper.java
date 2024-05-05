package com.bookify.backend.mapper;

import com.bookify.backend.api.external.requests.BookRequest;
import com.bookify.backend.api.external.response.BookResponse;
import com.bookify.backend.api.internal.Author;
import com.bookify.backend.api.internal.Book;
import com.bookify.backend.api.internal.Genre;
import com.bookify.backend.service.FileUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BookMapper {
    private final GenreMapper genreMapper;
    private final AuthorMapper authorMapper;

    public BookResponse mapToBookResponse(Book book) {
        return new BookResponse()
                .setId(book.getId())
                .setTitle(book.getTitle())
                .setCover(FileUtils.readFile(book.getCoverUrl()))
                .setAuthor(authorMapper.map(book.getAuthor()))
                .setGenre(genreMapper.map(book.getGenre()))
                .setPages(book.getPages())
                .setReleaseDate(book.getReleaseDate())
                .setDescription(book.getDescription());
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
