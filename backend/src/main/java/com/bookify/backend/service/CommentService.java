package com.bookify.backend.service;

import com.bookify.backend.api.external.requests.CommentRequest;
import com.bookify.backend.api.external.response.BasicCommentResponse;
import com.bookify.backend.api.external.response.PageResponse;
import com.bookify.backend.api.internal.Comment;
import com.bookify.backend.api.internal.User;

import java.util.List;

public interface CommentService {
    List<Comment> getCommentsForBook(Integer bookId, Integer limit);

    Integer getCommentCountForBook(Integer bookId);

    BasicCommentResponse addComment(CommentRequest commentRequest);

    BasicCommentResponse addComment(CommentRequest request, User user);

    PageResponse<BasicCommentResponse> getAllComments(Integer page, Integer size, String sortBy, String order, Boolean verified, Integer book, Integer user, String title);

    PageResponse<BasicCommentResponse> getCommentsForBook(Integer bookId, Integer page, Integer size);

    BasicCommentResponse updateComment(Integer id, CommentRequest commentRequest);

    Integer deleteComment(Integer id);

    BasicCommentResponse getComment(Integer id);

    Integer verifyComment(Integer id);

    List<BasicCommentResponse> getComments(Integer bookId, Integer userId);
}
