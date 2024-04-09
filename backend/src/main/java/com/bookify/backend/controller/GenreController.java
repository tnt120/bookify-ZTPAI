package com.bookify.backend.controller;

import com.bookify.backend.api.external.GenreDTO;
import com.bookify.backend.api.external.StatusResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.relational.core.sql.In;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/genre")
@RequiredArgsConstructor
public class GenreController {

    @GetMapping
    public List<GenreDTO> getGenres() {
        return List.of(new GenreDTO().setId(1).setName("horror"), new GenreDTO().setId(2).setName("thriller"));
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addGenre(@RequestBody GenreDTO genre) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new StatusResponseDTO(201));
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<Object> editGenre(@PathVariable Integer id, @RequestBody GenreDTO genre) {
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO(200));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteGenre(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO(200));
    }
}
