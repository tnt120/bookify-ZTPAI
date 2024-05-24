package com.bookify.backend.repository;

import com.bookify.backend.api.internal.Book;
import com.bookify.backend.api.internal.Rating;
import com.bookify.backend.api.internal.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Integer> {
    List<Rating> findAllByBookId(Integer bookId);
    void deleteAllByBook(Book book);
    Optional<Rating> findByBookAndUser(Book book, User user);
    Optional<Rating> findByBookIdAndUserId(Integer ratingId, Integer userId);
}
