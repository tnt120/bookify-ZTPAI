package com.bookify.backend.service.impl;

import com.bookify.backend.api.external.requests.BookRequest;
import com.bookify.backend.api.external.response.BookResponse;
import com.bookify.backend.api.external.response.PageResponse;
import com.bookify.backend.api.internal.*;
import com.bookify.backend.mapper.BookMapper;
import com.bookify.backend.mapper.CommentMapper;
import com.bookify.backend.mapper.RatingMapper;
import com.bookify.backend.repository.*;
import com.bookify.backend.service.BookService;
import com.bookify.backend.service.CommentService;
import com.bookify.backend.service.FileStorageService;
import com.bookify.backend.service.RatingService;
import com.bookify.backend.specification.BookSpecification;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

import static com.bookify.backend.handler.BusinessErrorCodes.*;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;
    private final BookMapper bookMapper;
    private final RatingMapper ratingMapper;
    private final CommentMapper commentMapper;
    private final FileStorageService fileStorageService;
    private final RatingService ratingService;
    private final CommentService commentService;
    private final RatingRepository ratingRepository;
    private final CommentRepository commentRepository;

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
    public Integer update(Integer bookId, BookRequest request) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!Objects.equals(user.getRole().getName(), "ADMIN")) {
            throw NO_PERMISSION.getError();
        }

        Book book = bookRepository.findById(bookId)
                .orElseThrow(BOOK_NOT_FOUND::getError);

        if (request.title() != null) {
            book.setTitle(request.title());
        }

        if (request.description() != null) {
            book.setDescription(request.description());
        }

        if (request.pages() != null) {
            book.setPages(request.pages());
        }

        if (request.releaseDate() != null) {
            book.setReleaseDate(request.releaseDate());
        }

        if (request.authorId() != null) {
            Author author = authorRepository
                    .findById(request.authorId())
                    .orElseThrow(AUTHOR_NOT_FOUND::getError);
            book.setAuthor(author);
        }

        if (request.genreId() != null) {
            Genre genre = genreRepository
                    .findById(request.genreId())
                    .orElseThrow(GENRE_NOT_FOUND::getError);
            book.setGenre(genre);
        }

        return bookRepository.save(book).getId();
    }

    @Override
    @Transactional
    public Integer delete(Integer id) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!Objects.equals(user.getRole().getName(), "ADMIN")) {
            throw NO_PERMISSION.getError();
        }

        Book book = bookRepository.findById(id)
                .orElseThrow(BOOK_NOT_FOUND::getError);

        fileStorageService.deleteFile(book.getCoverUrl());

        ratingRepository.deleteAllByBook(book);
        commentRepository.deleteAllByBook(book);

        bookRepository.delete(book);

        return id;
    }

    @Override
    public PageResponse<BookResponse> getAllBooks(Integer page, Integer size, String sortBy, String order, String title, Integer author, Integer genre) {

        Sort sort = order.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Specification<Book> spec = Specification.where(null);
        if (title != null) spec = spec.and(BookSpecification.titleContains(title));
        if (author != null) spec = spec.and(BookSpecification.authorIdEquals(author));
        if (genre != null) spec = spec.and(BookSpecification.genreIdEquals(genre));

        Page<Book> books = bookRepository.findAll(spec, pageable);

        List<BookResponse> bookResponse = books.stream()
                .map(book -> {
                    BookResponse response = bookMapper.mapToBookResponse(book);
                    response.setAvgRating(ratingService.getAvgRating(book.getId()));
                    return response;
                })
                .toList();

        return new PageResponse<BookResponse>()
                .setContent(bookResponse)
                .setCurrentPage(books.getNumber())
                .setPageSize(books.getSize())
                .setTotalElements(books.getTotalElements())
                .setTotalPages(books.getTotalPages())
                .setLast(books.isLast())
                .setFirst(books.isFirst());
    }

    @Override
    public BookResponse getBook(Integer id) {
        return bookRepository.findById(id)
                .map(book -> {
                    BookResponse response = bookMapper.mapToBookResponse(book);
                    response.setAvgRating(ratingService.getAvgRating(book.getId()));
                    response.setRatings(ratingService.getRatingsForBook(book.getId())
                            .stream()
                            .map(ratingMapper::map)
                            .toList()
                    );
                    response.setComments(commentService.getCommentsForBook(book.getId(), 3)
                            .stream()
                            .map(commentMapper::map)
                            .toList()
                    );
                    response.setCommentCount(commentService.getCommentCountForBook(book.getId()));
                    return response;
                })
                .orElseThrow(BOOK_NOT_FOUND::getError);
    }

    @Override
    public void uploadCover(Integer bookId, MultipartFile file) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!Objects.equals(user.getRole().getName(), "ADMIN")) {
            throw NO_PERMISSION.getError();
        }

        Book book = bookRepository.findById(bookId)
                .orElseThrow(BOOK_NOT_FOUND::getError);

        if (book.getCoverUrl() != null && !book.getCoverUrl().isEmpty()) {
            fileStorageService.deleteFile(book.getCoverUrl());
        }

        String bookCover = fileStorageService.saveFile(file);

        book.setCoverUrl(bookCover);
        bookRepository.save(book);
    }
}
