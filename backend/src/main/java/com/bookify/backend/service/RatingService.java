package com.bookify.backend.service;

import com.bookify.backend.api.external.requests.RatingRequest;
import com.bookify.backend.api.external.response.BasicRatingResponse;
import com.bookify.backend.api.internal.Rating;
import com.bookify.backend.api.internal.User;

import java.util.List;

public interface RatingService {
    List<Rating> getRatingsForBook(Integer bookId);

    Double getAvgRating(Integer bookId);

    Integer addRating(RatingRequest request);

    Integer addRating(RatingRequest request, User user);

    Integer updateRating(Integer ratingId, RatingRequest request);

    Integer deleteRating(Integer ratingId);

    BasicRatingResponse getUserRating(Integer userId, Integer bookId);
}
