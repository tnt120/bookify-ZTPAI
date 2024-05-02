package com.bookify.backend.service.impl;

import com.bookify.backend.api.external.BookDTO;
import com.bookify.backend.api.external.requests.BookRequest;
import com.bookify.backend.api.internal.Author;
import com.bookify.backend.api.internal.Book;
import com.bookify.backend.api.internal.Genre;
import com.bookify.backend.api.internal.User;
import com.bookify.backend.mapper.BookMapper;
import com.bookify.backend.repository.AuthorRepository;
import com.bookify.backend.repository.BookRepository;
import com.bookify.backend.repository.GenreRepository;
import com.bookify.backend.service.BookService;
import com.bookify.backend.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static com.bookify.backend.handler.BusinessErrorCodes.*;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;
    private final BookMapper bookMapper;
    private final FileStorageService fileStorageService;

    @Override
    public Integer save(BookRequest request) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!Objects.equals(user.getRole().getName(), "ADMIN")) {
            throw NO_PERMISSION.getError();
        }

        Author author = authorRepository
                .findById(request.authorId())
                .orElseThrow(AUTHOR_NOT_FOUND::getError);

        Genre genre = genreRepository
                .findById(request.genreId())
                .orElseThrow(GENRE_NOT_FOUND::getError);

        return bookRepository.save(bookMapper.map(request, author, genre)).getId();
    }

    @Override
    public List<BookDTO> getAllBooks() {
        return bookRepository.findAll()
                .stream().map(bookMapper::map)
                .toList();
    }

    @Override
    public void uploadCover(Integer bookId, MultipartFile file) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!Objects.equals(user.getRole().getName(), "ADMIN")) {
            throw NO_PERMISSION.getError();
        }

        Book book = bookRepository.findById(bookId)
                .orElseThrow(BOOK_NOT_FOUND::getError);

        String bookCover = fileStorageService.saveFile(file);

        book.setCoverUrl(bookCover);
        bookRepository.save(book);
    }
}
