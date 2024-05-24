package com.bookify.backend.controller;

import com.bookify.backend.api.external.StatusResponseDTO;
import com.bookify.backend.api.external.requests.CommentRequest;
import com.bookify.backend.api.external.response.BasicCommentResponse;
import com.bookify.backend.api.external.response.PageResponse;
import com.bookify.backend.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/all")
    public ResponseEntity<PageResponse<BasicCommentResponse>> getComments(
            @RequestParam(name = "page", defaultValue = "0", required = false) Integer page,
            @RequestParam(name = "size", defaultValue = "10", required = false) Integer size,
            @RequestParam(name = "sort", defaultValue = "id", required = false) String sortBy,
            @RequestParam(name = "order", defaultValue = "asc", required = false) String order,
            @RequestParam(name = "book", required = false) Integer book,
            @RequestParam(name = "user", required = false) Integer user
    ) {
        return ResponseEntity.ok(commentService.getAllComments(page, size, sortBy, order, book, user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PageResponse<BasicCommentResponse>> getComments
            (@PathVariable Integer id,
             @RequestParam(name = "page", defaultValue = "0", required = false) Integer page,
             @RequestParam(name = "size", defaultValue = "10", required = false) Integer size
            ) {
        return ResponseEntity.ok(commentService.getCommentsForBook(id, page, size));
    }

    @PostMapping()
    public ResponseEntity<Integer> addComment(@RequestBody CommentRequest comment) {
        return ResponseEntity.ok(this.commentService.addComment(comment));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Integer> editComment(@PathVariable Integer id, @RequestBody CommentRequest comment) {
        return ResponseEntity.ok(this.commentService.updateComment(id, comment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteComment(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO(200));
    }
}
