package com.bookify.backend.service.impl;

import com.bookify.backend.api.external.requests.CommentRequest;
import com.bookify.backend.api.external.requests.RatingRequest;
import com.bookify.backend.api.external.requests.UpdateBookcaseRequest;
import com.bookify.backend.api.external.response.BookBookcaseResponse;
import com.bookify.backend.api.external.response.DetailsBookcaseResponse;
import com.bookify.backend.api.external.response.PageResponse;
import com.bookify.backend.api.internal.*;
import com.bookify.backend.mapper.BookcaseMapper;
import com.bookify.backend.repository.*;
import com.bookify.backend.service.BookcaseService;
import com.bookify.backend.service.CommentService;
import com.bookify.backend.service.RatingService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.bookify.backend.handler.BusinessErrorCodes.BOOKCASE_TYPE_NOT_FOUND;
import static com.bookify.backend.handler.BusinessErrorCodes.BOOK_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class BookcaseServiceImpl implements BookcaseService {
    private final UserBookRepository userBookRepository;
    private final BookRepository bookRepository;
    private final BookcaseTypeRepository bookcaseTypeRepository;
    private final RatingRepository ratingRepository;
    private final CommentRepository commentRepository;
    private final BookcaseMapper bookcaseMapper;
    private final RatingService ratingService;
    private final CommentService commentService;

    @Override
    @Transactional
    public PageResponse<BookBookcaseResponse> getUserBooks(Integer bookcaseId, Integer page, Integer size, String sortBy, String order) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        BookcaseType bookcaseType = bookcaseTypeRepository.findById(bookcaseId)
                .orElseThrow(BOOKCASE_TYPE_NOT_FOUND::getError);

        Sort sort = order.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<UserBook> userBooks = userBookRepository.findByUserAndBookcaseType(user, bookcaseType, pageable);

        List<BookBookcaseResponse> booksBookcaseResponse = userBooks.stream()
                .map(userBook -> {
                    BookBookcaseResponse response = bookcaseMapper.map(userBook);
                    if (bookcaseType.getId() == 1) {
                        response.getBook().setRatings(List.of(ratingService.getUserRating(user.getId(), response.getBook().getId())));
                    }
                    return response;
                })
                .toList();

        return new PageResponse<BookBookcaseResponse>()
                .setContent(booksBookcaseResponse)
                .setCurrentPage(userBooks.getNumber())
                .setPageSize(userBooks.getSize())
                .setTotalElements(userBooks.getTotalElements())
                .setTotalPages(userBooks.getTotalPages())
                .setLast(userBooks.isLast())
                .setFirst(userBooks.isFirst());
    }

    @Override
    public DetailsBookcaseResponse getDetailsBookcase(Integer bookId) {

        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Book book = bookRepository.findById(bookId)
                .orElseThrow(BOOK_NOT_FOUND::getError);

        Optional<UserBook> userBookOptional = userBookRepository.findByUserAndBook(user, book);

        if (userBookOptional.isEmpty()) {
            return new DetailsBookcaseResponse()
                    .setId(0)
                    .setBookcaseId(0);
        }

        UserBook userBook = userBookOptional.get();

        return new DetailsBookcaseResponse()
                .setId(userBook.getId())
                .setBookcaseId(userBook.getBookcaseType().getId());
    }

    @Override
    public Integer updateUserBook(UpdateBookcaseRequest request) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        BookcaseType bookcaseType = bookcaseTypeRepository.findById(request.getBookcaseId())
                .orElseThrow(BOOKCASE_TYPE_NOT_FOUND::getError);

        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(BOOK_NOT_FOUND::getError);

        Optional<UserBook> userBookOptional = userBookRepository.findByUserAndBook(user, book);

        Integer userBookId;

        if (userBookOptional.isEmpty()) {
            UserBook userBook = new UserBook()
                    .setUser(user)
                    .setBook(book)
                    .setBookcaseType(bookcaseType)
                    .setCurrentPage(request.getCurrentPage());

            deleteRatingAndComment(userBook);

            userBookId = userBookRepository.save(userBook).getId();
        } else {
            UserBook userBook = userBookOptional.get();

            userBook.setBookcaseType(bookcaseType);
            userBook.setCurrentPage(request.getCurrentPage());

            deleteRatingAndComment(userBook);

            userBookId = userBookRepository.save(userBook).getId();
        }

        if (request.getRating() != null) {
            RatingRequest ratingRequest = new RatingRequest()
                    .setBookId(request.getBookId())
                    .setValue(request.getRating());

            ratingService.addRating(ratingRequest, user);
        }

        if (request.getComment() != null && !request.getComment().isEmpty()) {
            CommentRequest commentRequest = new CommentRequest()
                    .setBookId(request.getBookId())
                    .setContent(request.getComment());

            commentService.addComment(commentRequest, user);
        }

        return userBookId;
    }

    @Override
    public Integer deleteUserBook(Integer id) {

        UserBook userBook = userBookRepository.findById(id)
                .orElseThrow(BOOK_NOT_FOUND::getError);

        deleteRatingAndComment(userBook);

        userBookRepository.delete(userBook);

        return id;
    }

    private void deleteRatingAndComment(UserBook userBook) {
        ratingRepository.findByBookIdAndUserId(userBook.getBook().getId(), userBook.getUser().getId())
                .ifPresent(ratingRepository::delete);

        commentRepository.findByBookAndUser(userBook.getBook(), userBook.getUser())
                .ifPresent(commentRepository::delete);
    }
}
