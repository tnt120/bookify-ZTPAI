package com.bookify.backend.controller;

import com.bookify.backend.api.external.GenreDTO;
import com.bookify.backend.api.external.StatusResponseDTO;
import com.bookify.backend.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/genre")
@RequiredArgsConstructor
public class GenreController {
    private final GenreService genreService;

    @GetMapping
    public ResponseEntity<List<GenreDTO>> getGenres() {
        return ResponseEntity.ok(genreService.getAllGenres());
    }

    @PostMapping()
    public ResponseEntity<Object> addGenre(@RequestBody GenreDTO genre) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new StatusResponseDTO(201));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Object> editGenre(@PathVariable Integer id, @RequestBody GenreDTO genre) {
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO(200));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteGenre(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO(200));
    }
}
