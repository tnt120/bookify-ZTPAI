package com.bookify.backend.controller;

import com.bookify.backend.api.external.requests.RatingRequest;
import com.bookify.backend.service.RatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/ratings")
@RequiredArgsConstructor
public class RatingController {
    private final RatingService ratingService;

    @PostMapping()
    public ResponseEntity<Integer> addRating(@RequestBody RatingRequest rating) {
        return ResponseEntity.ok(this.ratingService.addRating(rating));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Object> editRating(@PathVariable Integer id, @RequestBody RatingRequest rating) {
        return ResponseEntity.ok(this.ratingService.updateRating(id, rating));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteRating(@PathVariable Integer id) {
        return ResponseEntity.ok(this.ratingService.deleteRating(id));
    }
}
