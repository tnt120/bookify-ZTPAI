package com.bookify.backend.controller;

import com.bookify.backend.api.external.response.AuthorResponse;
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
    public ResponseEntity<List<AuthorResponse>> getAuthors(
            @RequestParam(name = "sort", defaultValue = "id", required = false) String sortBy,
            @RequestParam(name = "order", defaultValue = "asc", required = false) String order,
            @RequestParam(name = "firstName", required = false) String firstName,
            @RequestParam(name = "lastName", required = false) String lastName
    ) {
        return ResponseEntity.ok(authorService.getAllAuthors(sortBy, order, firstName, lastName));
    }

    @PostMapping()
    public ResponseEntity<Integer> addAuthor(@RequestBody AuthorResponse authorResponse) {
        return ResponseEntity.ok(authorService.save(authorResponse));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Integer> editAuthor(@PathVariable Integer id, @RequestBody AuthorResponse author) {
        return ResponseEntity.status(HttpStatus.OK).body(authorService.update(id, author));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Integer> deleteAuthor(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(authorService.delete(id));
    }
}
