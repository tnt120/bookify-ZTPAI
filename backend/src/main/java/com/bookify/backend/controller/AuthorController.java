package com.bookify.backend.controller;

import com.bookify.backend.api.external.AuthorDTO;
import com.bookify.backend.api.external.StatusResponseDTO;
import com.bookify.backend.service.AuthorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/author")
@RequiredArgsConstructor
public class AuthorController {
    private final AuthorService authorService;

    @GetMapping
    public ResponseEntity<List<AuthorDTO>> getAuthors() {
        return ResponseEntity.ok(authorService.getAllAuthors());
    }

    @PostMapping()
    public AuthorDTO saveAuthor(@RequestBody AuthorDTO authorDTO) {
        return authorService.save(authorDTO);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Object> editAuthor(@PathVariable Integer id, @RequestBody AuthorDTO authorDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO(200));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteAuthor(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO(200));
    }
}
