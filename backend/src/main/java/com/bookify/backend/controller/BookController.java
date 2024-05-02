package com.bookify.backend.controller;

import com.bookify.backend.api.external.*;
import com.bookify.backend.api.external.requests.BookRequest;
import com.bookify.backend.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/book")
@RequiredArgsConstructor
public class BookController {
    private final BookService bookService;

    @GetMapping
    public ResponseEntity<List<BookDTO>> getBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
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
    public ResponseEntity<Integer> addBook(@RequestBody BookRequest request) {
        return ResponseEntity.ok(bookService.save(request));
    }

    @PostMapping(value = "/cover/{bookId}", consumes = "multipat/form-data")
    public ResponseEntity<?> uploadBookCover(
            @PathVariable("bookId") Integer bookId,
            @RequestPart("file") MultipartFile file
    ) {
        bookService.uploadCover(bookId, file);
        return ResponseEntity.accepted().build();
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
