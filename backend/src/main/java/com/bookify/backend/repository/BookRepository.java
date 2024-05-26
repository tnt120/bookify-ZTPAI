package com.bookify.backend.repository;

import com.bookify.backend.api.internal.Author;
import com.bookify.backend.api.internal.Book;
import com.bookify.backend.api.internal.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer>, JpaSpecificationExecutor<Book> {
    void deleteAllByAuthor(Author author);

    void deleteAllByGenre(Genre genre);

    Optional<Book> findByAuthor(Author author);
    Optional<Book> findByGenre(Genre genre);
}
