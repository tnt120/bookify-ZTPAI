package com.bookify.backend.controller;

import com.bookify.backend.api.external.requests.BookRequest;
import com.bookify.backend.api.external.response.BookResponse;
import com.bookify.backend.api.external.response.PageResponse;
import com.bookify.backend.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @GetMapping("/{bookId}")
    public ResponseEntity<BookResponse> getBook(
            @PathVariable Integer bookId,
            @RequestParam Integer userId
    ) {
        return ResponseEntity.ok(bookService.getBook(bookId, userId));
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
    public ResponseEntity<Integer> editBook(@PathVariable Integer id, @RequestBody BookRequest book) {
        return ResponseEntity.status(HttpStatus.OK).body(bookService.update(id, book));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Integer> deleteBook(@PathVariable Integer id) {
        return ResponseEntity.ok(bookService.delete(id));
    }
}
