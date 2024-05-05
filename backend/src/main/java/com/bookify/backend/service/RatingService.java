package com.bookify.backend.service;

import com.bookify.backend.api.internal.Rating;

import java.util.List;

public interface RatingService {
    List<Rating> getRatingsForBook(Integer bookId);

    Double getAvgRating(Integer bookId);
}
