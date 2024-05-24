package com.bookify.backend.specification;

import com.bookify.backend.api.internal.Comment;
import org.springframework.data.jpa.domain.Specification;

public class CommentSpecification {
    public static Specification<Comment> bookIdEquals(Integer bookId) {
        return (root, query, cb) -> cb.equal(root.get("book").get("id"), bookId);
    }

    public static Specification<Comment> userIdEquals(Integer userId) {
        return (root, query, cb) -> cb.equal(root.get("user").get("id"), userId);
    }
}
