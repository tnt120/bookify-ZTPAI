package com.bookify.backend.controller;


import com.bookify.backend.api.external.*;
import com.bookify.backend.api.external.response.BookBookcaseResponse;
import com.bookify.backend.api.external.response.PageResponse;
import com.bookify.backend.service.BookcaseService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/userBook")
@RequiredArgsConstructor
public class UserBookController {
    private final BookcaseService bookcaseService;

    @GetMapping()
    public ResponseEntity<PageResponse<BookBookcaseResponse>> getUserBooks(
            @RequestParam(name = "bookcaseId") Integer bookcaseId,
            @RequestParam(name = "page", defaultValue = "0", required = false) Integer page,
            @RequestParam(name = "size", defaultValue = "10", required = false) Integer size,
            @RequestParam(name = "sort", defaultValue = "id", required = false) String sortBy,
            @RequestParam(name = "order", defaultValue = "desc", required = false) String order
    ) {
        return ResponseEntity.ok(bookcaseService.getUserBooks(bookcaseId, page, size, sortBy, order));
    }

    @PostMapping()
    public ResponseEntity<Object> addUserBook(@RequestBody UserBookDTO userBook) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new StatusResponseDTO(201));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Object> editUserBook(@PathVariable Integer id, @RequestBody UserBookDTO userBook) {
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO(200));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUserBook(@PathVariable Integer id) {
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO(200));
    }
}
