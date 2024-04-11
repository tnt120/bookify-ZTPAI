package com.bookify.backend.controller;

import com.bookify.backend.api.external.*;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/book")
@NoArgsConstructor
public class BookController {

    @GetMapping
    public List<BookDTO> getBooks() {
        return List.of(
                new BookDTO()
                        .setId(1)
                        .setTitle("Cos")
                        .setCoverUrl("xd")
                        .setAuthor(new AuthorDTO().setId(1).setFirstName("Jan").setLastName("Brzechwa"))
                        .setGenre(new GenreDTO().setId(1).setName("horror"))
        );
    }

    @GetMapping("/{id}")
    public BookDTO getBook(@PathVariable Integer id) {
        return new BookDTO()
                .setId(1)
                .setTitle("Cos")
                .setCoverUrl("xd")
                .setAuthor(new AuthorDTO().setId(1).setFirstName("Jan").setLastName("Brzechwa"))
                .setGenre(new GenreDTO().setId(1).setName("horror"))
                .setPages(400)
                .setReleaseDate(LocalDate.of(2021, 8, 30))
                .setDescription("eloelo321")
                .setComments(List.of(new CommentDTO().setId(1).setContent("fajne")))
                .setRatings(List.of(new RatingDTO().setId(1).setValue(10), new RatingDTO().setId(2).setValue(5)));
    }

    @PostMapping()
    public ResponseEntity<Object> addBook(@RequestBody BookDTO book) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new StatusResponseDTO(201));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Object> editBook(@PathVariable Integer id, @RequestBody BookDTO book) {
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO(200));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteBook(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO(200));
    }
}
