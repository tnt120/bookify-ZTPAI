package com.bookify.backend.repository;

import com.bookify.backend.api.internal.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Integer> {
    List<Rating> findAllByBookId(Integer bookId);
}
