package com.bookify.backend.repository;

import com.bookify.backend.api.internal.Book;
import com.bookify.backend.api.internal.Comment;
import com.bookify.backend.api.internal.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    void deleteAllByBook(Book book);
    List<Comment> findAllByBookId(Integer bookId, Pageable pageable);
    Integer countByBookId(Integer bookId);
    Optional<Comment> findByBookAndUser(Book book, User user);
}
