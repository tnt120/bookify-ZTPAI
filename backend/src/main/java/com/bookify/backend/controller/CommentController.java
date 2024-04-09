package com.bookify.backend.controller;

import com.bookify.backend.api.external.CommentDTO;
import com.bookify.backend.api.external.StatusResponseDTO;
import com.bookify.backend.api.external.UserDTO;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
@NoArgsConstructor
public class CommentController {
    @GetMapping("")
    public List<CommentDTO> getComments() {
        return List.of(new CommentDTO()
                .setId(1)
                .setContent("Fajna ksiazka")
                .setCommentDate(LocalDate.of(2024, 4, 9))
                .setCommentAuthor(new UserDTO().setId(1).setEmail("test@test.com")));
    }

    @GetMapping("/{id}")
    public List<CommentDTO> getComments(@PathVariable Integer id) {
        return List.of(new CommentDTO()
                .setId(1)
                .setContent("Super ksiazka")
                .setCommentDate(LocalDate.of(2024, 4, 9))
                .setCommentAuthor(new UserDTO().setId(1).setEmail("test123@test.com")));
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addComment(@RequestBody CommentDTO comment) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new StatusResponseDTO(201));
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<Object> editComment(@PathVariable Integer id, @RequestBody CommentDTO comment) {
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO(200));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteComment(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO(200));
    }
}
