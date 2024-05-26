package com.bookify.backend.mapper;

import com.bookify.backend.api.external.response.BasicRatingResponse;
import com.bookify.backend.api.internal.Rating;
import org.springframework.stereotype.Component;

@Component
public class RatingMapper {
    public BasicRatingResponse map(Rating rating) {
        return new BasicRatingResponse()
                .setId(rating.getId())
                .setUserId(rating.getUser().getId())
                .setCreatedAt(rating.getCreatedAt())
                .setValue(rating.getValue());
    }
}
