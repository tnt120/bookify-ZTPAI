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

    @PostMapping("/add")
    public ResponseEntity<Object> addBook(@RequestBody BookDTO book) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new StatusResponseDTO(201));
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<Object> editBook(@PathVariable Integer id, @RequestBody BookDTO book) {
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO(200));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteBook(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO(200));
    }

    @GetMapping("/userBooks/{id}")
    public List<UserBookDTO> getUserBooks(@PathVariable Integer id) {
        return List.of(new UserBookDTO()
                .setId(1)
                .setUser(new UserDTO().setId(1).setEmail("test@test"))
                .setBook(new BookDTO()
                        .setId(1)
                        .setTitle("Cos")
                        .setCoverUrl("xd")
                        .setAuthor(new AuthorDTO().setId(1).setFirstName("Jan").setLastName("Brzechwa"))
                        .setGenre(new GenreDTO().setId(1).setName("horror"))
                        .setPages(400)
                        .setReleaseDate(LocalDate.of(2021, 8, 30))
                        .setRatings(List.of(new RatingDTO().setId(1).setValue(10), new RatingDTO().setId(2).setValue(5))))
                .setBookcaseType(new BookcaseTypeDTO().setId(1).setName("W trakcie czytania"))
                .setCurrentPage(200)
        );
    }

    @PostMapping("/userBooks/add")
    public ResponseEntity<Object> addUserBook(@RequestBody UserBookDTO userBook) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new StatusResponseDTO(201));
    }

    @PatchMapping("/userBooks/edit/{id}")
    public ResponseEntity<Object> editUserBook(@PathVariable Integer id, @RequestBody UserBookDTO userBook) {
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO(200));
    }

    @DeleteMapping("/userBooks/delete/{id}")
    public ResponseEntity<Object> deleteUserBook(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO(200));
    }
}
