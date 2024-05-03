package com.bookify.backend.controller;

import com.bookify.backend.api.external.*;
import com.bookify.backend.api.external.requests.BookRequest;
import com.bookify.backend.api.external.response.BookResponse;
import com.bookify.backend.api.external.response.PageResponse;
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
    public ResponseEntity<PageResponse<BookResponse>> getBooks(
            @RequestParam(name = "page", defaultValue = "0", required = false) Integer page,
            @RequestParam(name = "size", defaultValue = "10", required = false) Integer size,
            @RequestParam(name = "sort", defaultValue = "id", required = false) String sortBy,
            @RequestParam(name = "order", defaultValue = "asc", required = false) String order,
            @RequestParam(name = "title", required = false) String title,
            @RequestParam(name = "author", required = false) Integer author,
            @RequestParam(name = "genre", required = false) Integer genre
    ) {
        return ResponseEntity.ok(bookService.getAllBooks(page, size, sortBy, order, title, author, genre));
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

    @PostMapping(value = "/cover/{bookId}", consumes = "multipart/form-data")
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
