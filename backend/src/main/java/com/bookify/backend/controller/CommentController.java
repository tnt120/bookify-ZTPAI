package com.bookify.backend.controller;

import com.bookify.backend.api.external.CommentDTO;
import com.bookify.backend.api.external.StatusResponseDTO;
import com.bookify.backend.api.external.UserDTO;
import com.bookify.backend.api.external.requests.CommentRequest;
import com.bookify.backend.api.external.response.BasicCommentResponse;
import com.bookify.backend.api.external.response.PageResponse;
import com.bookify.backend.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

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
    public List<CommentDTO> getComments(@PathVariable Integer id) {
        return List.of(new CommentDTO()
                .setId(1)
                .setContent("Super ksiazka")
                .setCommentDate(LocalDate.of(2024, 4, 9))
                .setCommentAuthor(new UserDTO().setId(1).setEmail("test123@test.com")));
    }

    @PostMapping()
    public ResponseEntity<Integer> addComment(@RequestBody CommentRequest comment) {
        return ResponseEntity.ok(this.commentService.addComment(comment));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Object> editComment(@PathVariable Integer id, @RequestBody CommentDTO comment) {
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO(200));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteComment(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO(200));
    }
}
