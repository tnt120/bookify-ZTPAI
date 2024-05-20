package com.bookify.backend.controller;


import com.bookify.backend.api.external.requests.UpdateBookcaseRequest;
import com.bookify.backend.api.external.response.BookBookcaseResponse;
import com.bookify.backend.api.external.response.PageResponse;
import com.bookify.backend.service.BookcaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Integer> updateUserBook(@RequestBody UpdateBookcaseRequest request) {
        return ResponseEntity.ok(bookcaseService.updateUserBook(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Integer> deleteUserBook(@PathVariable Integer id) {
        return ResponseEntity.ok(bookcaseService.deleteUserBook(id));
    }
}
