package com.bookify.backend.service;

import com.bookify.backend.api.external.requests.CommentRequest;
import com.bookify.backend.api.external.response.BasicCommentResponse;
import com.bookify.backend.api.external.response.PageResponse;
import com.bookify.backend.api.internal.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> getCommentsForBook(Integer bookId, Integer limit);

    Integer getCommentCountForBook(Integer bookId);

    Integer addComment(CommentRequest commentRequest);

    PageResponse<BasicCommentResponse> getAllComments(Integer page, Integer size, String sortBy, String order, Integer book, Integer user);

    PageResponse<BasicCommentResponse> getCommentsForBook(Integer bookId, Integer page, Integer size);

    Integer updateComment(Integer id, CommentRequest commentRequest);
}
