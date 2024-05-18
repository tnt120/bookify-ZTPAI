package com.bookify.backend.service.impl;

import com.bookify.backend.api.internal.Comment;
import com.bookify.backend.repository.CommentRepository;
import com.bookify.backend.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;

    @Override
    public List<Comment> getCommentsForBook(Integer bookId, Integer limit) {
        Sort sort = Sort.by("createdAt").descending();
        Pageable pageable = PageRequest.of(0, limit, sort);
        return commentRepository.findAllByBookId(bookId, pageable);
    }

    @Override
    public Integer getCommentCountForBook(Integer bookId) {
        return commentRepository.countByBookId(bookId);
    }
}
