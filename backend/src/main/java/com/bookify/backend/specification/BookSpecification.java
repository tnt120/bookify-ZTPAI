package com.bookify.backend.specification;

import com.bookify.backend.api.internal.Book;
import org.springframework.data.jpa.domain.Specification;

public class BookSpecification {
    public static Specification<Book> titleContains(String title) {
        return (root, query, cb) -> cb.like(cb.lower(root.get("title")), "%" + title.toLowerCase() + "%");
    }

    public static Specification<Book> authorIdEquals(Integer authorId) {
        return (root, query, cb) -> cb.equal(root.get("author").get("id"), authorId);
    }

    public static Specification<Book> genreIdEquals(Integer genreId) {
        return (root, query, cb) -> cb.equal(root.get("genre").get("id"), genreId);
    }
}
