package com.bookify.backend.service.impl;

import com.bookify.backend.api.internal.Rating;
import com.bookify.backend.repository.RatingRepository;
import com.bookify.backend.service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RatingServiceImpl implements RatingService {
    private final RatingRepository ratingRepository;

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
}
