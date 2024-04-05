package com.bookify.backend.repository;

import com.bookify.backend.api.internal.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Integer> {
    Optional<Author> findAuthorByEmail(String email);
}
