package com.bookify.backend.service.impl;

import com.bookify.backend.api.external.requests.RatingRequest;
import com.bookify.backend.api.external.response.BasicRatingResponse;
import com.bookify.backend.api.internal.Book;
import com.bookify.backend.api.internal.Rating;
import com.bookify.backend.api.internal.User;
import com.bookify.backend.mapper.RatingMapper;
import com.bookify.backend.repository.BookRepository;
import com.bookify.backend.repository.RatingRepository;
import com.bookify.backend.service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import static com.bookify.backend.handler.BusinessErrorCodes.*;

@Service
@RequiredArgsConstructor
public class RatingServiceImpl implements RatingService {
    private final RatingRepository ratingRepository;
    private final BookRepository bookRepository;
    private final RatingMapper ratingMapper;

    @Override
    public List<Rating> getRatingsForBook(Integer bookId) {
        return ratingRepository.findAllByBookId(bookId);
    }

    @Override
    public Double getAvgRating(Integer bookId) {
        List<Rating> ratings = getRatingsForBook(bookId);

        double avgRating = ratings.isEmpty()
                ? 0.0
                : ratings.stream().mapToDouble(Rating::getValue).average().orElse(0.0);
        return Math.round(avgRating * 10) / 10.0;
    }

    @Override
    public Integer addRating(RatingRequest request) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (request.getValue() > 10 || request.getValue() < 1) {
            throw INVALID_RATING_VALUE.getError();
        }

        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(BOOK_NOT_FOUND::getError);

        ratingRepository.findByBookAndUser(book, user)
                .ifPresent(rating -> {
                    throw RATING_ALREADY_EXISTS.getError();
                });

        Rating rating = new Rating()
                .setBook(book)
                .setUser(user)
                .setValue(request.getValue())
                .setCreatedAt(LocalDateTime.now());

        return ratingRepository.save(rating).getId();
    }

    @Override
    public Integer updateRating(Integer ratingId, RatingRequest request) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (request.getValue() > 10 || request.getValue() < 1) {
            throw INVALID_RATING_VALUE.getError();
        }

        Rating rating = ratingRepository.findById(ratingId)
                .orElseThrow(RATING_NOT_FOUND::getError);

        if (!rating.getUser().getId().equals(user.getId())) {
            throw INVALID_USER.getError();
        }

        rating.setValue(request.getValue());

        return ratingRepository.save(rating).getId();
    }

    @Override
    public Integer deleteRating(Integer ratingId) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Rating rating = ratingRepository.findById(ratingId)
                .orElseThrow(RATING_NOT_FOUND::getError);

        if (!rating.getUser().getId().equals(user.getId())) {
            throw INVALID_USER.getError();
        }

        ratingRepository.delete(rating);

        return ratingId;
    }

    @Override
    public BasicRatingResponse getUserRating(Integer userId, Integer bookId) {

        return ratingMapper.map(ratingRepository.findByBookIdAndUserId(bookId, userId)
                .orElseThrow(RATING_NOT_FOUND::getError));
    }
}
