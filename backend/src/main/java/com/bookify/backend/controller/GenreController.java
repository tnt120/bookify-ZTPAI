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
    public ResponseEntity<List<GenreDTO>> getGenres(
            @RequestParam(name = "sort", defaultValue = "id", required = false) String sortBy,
            @RequestParam(name = "order", defaultValue = "asc", required = false) String order,
            @RequestParam(name = "name", required = false) String name
    ) {
        return ResponseEntity.ok(genreService.getAllGenres(sortBy, order, name));
    }

    @PostMapping()
    public ResponseEntity<Integer> addGenre(@RequestBody GenreDTO genre) {
        return ResponseEntity.ok(genreService.save(genre));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Integer> editGenre(@PathVariable Integer id, @RequestBody GenreDTO genre) {
        return ResponseEntity.ok(genreService.update(id, genre));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Integer> deleteGenre(@PathVariable Integer id) {
        return ResponseEntity.ok(genreService.delete(id));
    }
}
