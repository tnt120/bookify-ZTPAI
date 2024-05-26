package com.bookify.backend.specification;

import com.bookify.backend.api.internal.Comment;
import org.springframework.data.jpa.domain.Specification;

public class CommentSpecification {
    public static Specification<Comment> bookIdEquals(Integer bookId) {
        return (root, query, cb) -> cb.equal(root.get("book").get("id"), bookId);
    }

    public static Specification<Comment> titleContains(String title) {
        return (root, query, cb) -> cb.like(cb.lower(root.get("book").get("title")), "%" + title.toLowerCase() + "%");
    }

    public static Specification<Comment> userIdEquals(Integer userId) {
        return (root, query, cb) -> cb.equal(root.get("user").get("id"), userId);
    }

    public static Specification<Comment> verifiedEquals(boolean verified) {
        return (root, query, cb) -> cb.equal(root.get("isVerified"), verified);
    }
}
