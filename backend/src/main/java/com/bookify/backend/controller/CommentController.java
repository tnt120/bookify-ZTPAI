package com.bookify.backend.controller;

import com.bookify.backend.api.external.CommentDTO;
import com.bookify.backend.api.external.StatusResponseDTO;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@NoArgsConstructor
public class CommentController {
    @GetMapping("")
    public List<CommentDTO> getComments() {
        return List.of(new CommentDTO().setId(1).setContent("Fajna ksiazka"));
    }

    @GetMapping("/{id}")
    public List<CommentDTO> getComments(@PathVariable int id) {
        return List.of(new CommentDTO().setId(id).setContent("Gorsza ksiazka"));
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addComment(@RequestBody CommentDTO comment) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new StatusResponseDTO(201));
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<Object> editComment(@PathVariable int id, @RequestBody CommentDTO comment) {
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO(200));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteComment(@RequestBody CommentDTO comment) {
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO(200));
    }
}
