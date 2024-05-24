package com.bookify.backend.service.impl;

import com.bookify.backend.api.external.requests.CommentRequest;
import com.bookify.backend.api.internal.Book;
import com.bookify.backend.api.internal.Comment;
import com.bookify.backend.api.internal.User;
import com.bookify.backend.kafka.KafkaReceiveModel;
import com.bookify.backend.repository.BookRepository;
import com.bookify.backend.repository.CommentRepository;
import com.bookify.backend.repository.UserRepository;
import com.bookify.backend.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import static com.bookify.backend.handler.BusinessErrorCodes.*;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final BookRepository bookRepository;
    private final KafkaTemplate<String, KafkaReceiveModel> kafkaTemplate;
    private final UserRepository userRepository;

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

    @Override
    public Integer addComment(CommentRequest request) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (request.getContent().isEmpty()) {
            throw EMPTY_COMMENT.getError();
        }

        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(BOOK_NOT_FOUND::getError);

        commentRepository.findByBookAndUser(book, user)
                .ifPresent(comment -> {
                    throw COMMENT_ALREADY_EXISTS.getError();
                });

        Comment comment = new Comment()
                .setBook(book)
                .setUser(user)
                .setContent(request.getContent())
                .setCreatedAt(LocalDateTime.now())
                .setVerified(true);

        Integer commentId = commentRepository.save(comment).getId();

        verifyComment(comment);

        return commentId;
    }

    private void verifyComment(Comment comment) {

        List<String> bannedWords = List.of("bad", "ugly", "nasty");

        if (bannedWords.stream().anyMatch(comment.getContent().toLowerCase()::contains)) {
            List<User> admins = userRepository.findUserByRoleId(2);

            KafkaReceiveModel kafkaReceiveModel = new KafkaReceiveModel()
                    .setCommentId(comment.getId())
                    .setEmails(admins.stream().map(User::getEmail).toList())
                    .setStrategy("VERIFY")
                    .setSubject("Verify comment");

            this.kafkaTemplate.send("mails", kafkaReceiveModel);
            comment.setVerified(false);
            commentRepository.save(comment);
        }
    }
}
