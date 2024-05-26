package com.bookify.backend.controller;

import com.bookify.backend.api.external.requests.CommentRequest;
import com.bookify.backend.api.external.response.BasicCommentResponse;
import com.bookify.backend.api.external.response.PageResponse;
import com.bookify.backend.service.CommentService;
import lombok.RequiredArgsConstructor;
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
            @RequestParam(name = "verified") Boolean verified,
            @RequestParam(name = "title", required = false) String title,
            @RequestParam(name = "user", required = false) Integer user
    ) {
        return ResponseEntity.ok(commentService.getAllComments(page, size, sortBy, order, verified, null, user, title));
    }

    @GetMapping("allByBook/{id}")
    public ResponseEntity<PageResponse<BasicCommentResponse>> getComments
            (@PathVariable Integer id,
             @RequestParam(name = "page", defaultValue = "0", required = false) Integer page,
             @RequestParam(name = "size", defaultValue = "10", required = false) Integer size
            ) {
        return ResponseEntity.ok(commentService.getCommentsForBook(id, page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BasicCommentResponse> getComment(@PathVariable Integer id) {
        return ResponseEntity.ok(commentService.getComment(id));
    }

    @PostMapping()
    public ResponseEntity<BasicCommentResponse> addComment(@RequestBody CommentRequest comment) {
        return ResponseEntity.ok(this.commentService.addComment(comment));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<BasicCommentResponse> editComment(@PathVariable Integer id, @RequestBody CommentRequest comment) {
        return ResponseEntity.ok(this.commentService.updateComment(id, comment));
    }

    @PatchMapping("/verify/{id}")
    public ResponseEntity<Integer> verifyComment(@PathVariable Integer id) {
        return ResponseEntity.ok(this.commentService.verifyComment(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Integer> deleteComment(@PathVariable Integer id) {
        return ResponseEntity.ok(this.commentService.deleteComment(id));
    }
}
