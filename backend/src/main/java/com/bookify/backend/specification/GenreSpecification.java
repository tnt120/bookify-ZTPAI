package com.bookify.backend.specification;

import com.bookify.backend.api.internal.Genre;
import org.springframework.data.jpa.domain.Specification;

public class GenreSpecification {
    public static Specification<Genre> nameContains(String name) {
        return (root, query, cb) -> cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%");
    }
}
