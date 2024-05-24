package com.bookify.backend.mapper;

import com.bookify.backend.api.external.response.BasicCommentResponse;
import com.bookify.backend.api.internal.Comment;
import org.springframework.stereotype.Component;

@Component
public class CommentMapper {
    public BasicCommentResponse map(Comment comment) {
        return new BasicCommentResponse()
                .setId(comment.getId())
                .setUserId(comment.getUser().getId())
                .setUserFirstname(comment.getUser().getFirstName())
                .setCreatedAt(comment.getCreatedAt())
                .setContent(comment.getContent())
                .setVerified(comment.isVerified());
    }
}
