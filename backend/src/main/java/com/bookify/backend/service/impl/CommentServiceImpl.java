package com.bookify.backend.service.impl;

import com.bookify.backend.api.external.requests.CommentRequest;
import com.bookify.backend.api.external.response.BasicCommentResponse;
import com.bookify.backend.api.external.response.PageResponse;
import com.bookify.backend.api.internal.Book;
import com.bookify.backend.api.internal.Comment;
import com.bookify.backend.api.internal.User;
import com.bookify.backend.kafka.KafkaReceiveModel;
import com.bookify.backend.mapper.CommentMapper;
import com.bookify.backend.repository.BookRepository;
import com.bookify.backend.repository.CommentRepository;
import com.bookify.backend.repository.UserRepository;
import com.bookify.backend.service.CommentService;
import com.bookify.backend.specification.CommentSpecification;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static com.bookify.backend.handler.BusinessErrorCodes.*;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final BookRepository bookRepository;
    private final KafkaTemplate<String, KafkaReceiveModel> kafkaTemplate;
    private final UserRepository userRepository;
    private final CommentMapper commentMapper;

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
    public BasicCommentResponse addComment(CommentRequest request) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return addComment(request, user);
    }

    @Override
    public BasicCommentResponse addComment(CommentRequest request, User user) {
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

        commentRepository.save(comment);

        verifyComment(comment);

        return commentMapper.map(comment);
    }

    @Override
    public PageResponse<BasicCommentResponse> getAllComments(Integer page, Integer size, String sortBy, String order, Boolean verified, Integer book, Integer user, String title) {

        Sort sort = order.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Specification<Comment> spec = Specification.where(null);
        if(book != null) spec = spec.and(CommentSpecification.bookIdEquals(book));
        if(title != null) spec = spec.and(CommentSpecification.titleContains(title));
        if(user != null) spec = spec.and(CommentSpecification.userIdEquals(user));

        spec = spec.and(CommentSpecification.verifiedEquals(verified));

        Page<Comment> comments = commentRepository.findAll(spec, pageable);

        List<BasicCommentResponse> commentResponse = comments.stream()
                .map(commentMapper::map)
                .toList();

        return new PageResponse<BasicCommentResponse>()
                .setContent(commentResponse)
                .setCurrentPage(comments.getNumber())
                .setPageSize(comments.getSize())
                .setTotalElements(comments.getTotalElements())
                .setTotalPages(comments.getTotalPages())
                .setLast(comments.isLast())
                .setFirst(comments.isFirst());
    }

    @Override
    public PageResponse<BasicCommentResponse> getCommentsForBook(Integer bookId, Integer page, Integer size) {
        return this.getAllComments(page, size, "createdAt", "desc", true, bookId, null, null);
    }

    @Override
    public BasicCommentResponse updateComment(Integer id, CommentRequest commentRequest) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Comment comment = commentRepository.findById(id)
                .orElseThrow(COMMENT_NOT_FOUND::getError);

        if (!comment.getUser().getId().equals(user.getId())) {
            throw INVALID_USER.getError();
        }

        comment.setContent(commentRequest.getContent());
        comment.setCreatedAt(LocalDateTime.now());
        comment.setVerified(true);

        this.verifyComment(comment);

        return commentMapper.map(commentRepository.save(comment));
    }

    @Override
    public Integer deleteComment(Integer commentId) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(COMMENT_NOT_FOUND::getError);

        if (!comment.getUser().getId().equals(user.getId()) && !user.getRole().getName().equals("ADMIN")) {
            throw INVALID_USER.getError();
        }

        if (user.getRole().getName().equals("ADMIN")) {
            User commentUser = comment.getUser();

            KafkaReceiveModel kafkaReceiveModel = new KafkaReceiveModel()
                    .setCommentId(comment.getId())
                    .setEmails(List.of(commentUser.getEmail()))
                    .setStrategy("DELETE")
                    .setSubject("Deleted comment")
                    .setBook(comment.getBook().getTitle());

            this.kafkaTemplate.send("mails", kafkaReceiveModel);
        }

        commentRepository.delete(comment);

        return commentId;
    }

    @Override
    public BasicCommentResponse getComment(Integer id) {
        return commentRepository.findById(id)
                .map(commentMapper::map)
                .orElseThrow(COMMENT_NOT_FOUND::getError);
    }

    @Override
    public Integer verifyComment(Integer id) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!Objects.equals(user.getRole().getName(), "ADMIN")) {
            throw NO_PERMISSION.getError();
        }

        Comment comment = commentRepository.findById(id)
                .orElseThrow(COMMENT_NOT_FOUND::getError);

        comment.setVerified(true);

        return commentRepository.save(comment).getId();
    }

    @Override
    @Transactional
    public List<BasicCommentResponse> getComments(Integer bookId, Integer userId) {

        List<Comment> comments = new ArrayList<>();

        if (userId != 0) {
            commentRepository.findByUserIdAndBookId(userId, bookId).ifPresent(comments::add);
        }

        List<Comment> bookComments = getCommentsForBook(bookId, 3)
                .stream()
                .filter(comment -> !Objects.equals(comment.getUser().getId(), userId))
                .toList();

        comments.addAll(bookComments);

        return comments
                .stream()
                .map(commentMapper::map)
                .filter(BasicCommentResponse::isVerified)
                .toList();
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
