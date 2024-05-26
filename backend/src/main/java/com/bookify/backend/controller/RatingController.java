package com.bookify.backend.controller;

import com.bookify.backend.api.external.requests.RatingRequest;
import com.bookify.backend.api.external.response.BasicRatingResponse;
import com.bookify.backend.service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/ratings")
@RequiredArgsConstructor
public class RatingController {
    private final RatingService ratingService;

    @GetMapping("/{bookId}")
    public ResponseEntity<BasicRatingResponse> getRating(
            @PathVariable Integer bookId,
            @RequestParam(name = "userId", defaultValue = "0", required = false) Integer userId
    ) {
        return ResponseEntity.ok(ratingService.getUserRating(userId, bookId));
    }

    @PostMapping()
    public ResponseEntity<Integer> addRating(@RequestBody RatingRequest rating) {
        return ResponseEntity.ok(this.ratingService.addRating(rating));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Integer> editRating(@PathVariable Integer id, @RequestBody RatingRequest rating) {
        return ResponseEntity.ok(this.ratingService.updateRating(id, rating));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Integer> deleteRating(@PathVariable Integer id) {
        return ResponseEntity.ok(this.ratingService.deleteRating(id));
    }
}
