package com.bookify.backend.service;

import com.bookify.backend.api.external.requests.CommentRequest;
import com.bookify.backend.api.internal.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> getCommentsForBook(Integer bookId, Integer limit);

    Integer getCommentCountForBook(Integer bookId);

    Integer addComment(CommentRequest commentRequest);
}
