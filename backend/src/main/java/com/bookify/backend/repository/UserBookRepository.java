package com.bookify.backend.repository;

import com.bookify.backend.api.internal.BookcaseType;
import com.bookify.backend.api.internal.User;
import com.bookify.backend.api.internal.UserBook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserBookRepository extends JpaRepository<UserBook, Integer> {
    Page<UserBook> findByUserAndBookcaseType(User user, BookcaseType bookcaseType, Pageable pageable);
}
