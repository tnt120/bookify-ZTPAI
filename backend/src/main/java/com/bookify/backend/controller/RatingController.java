package com.bookify.backend.controller;

import com.bookify.backend.api.external.RatingDTO;
import com.bookify.backend.api.external.StatusResponseDTO;
import com.bookify.backend.api.internal.User;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/ratings")
@NoArgsConstructor
public class RatingController {
    @GetMapping("/{id}")
    public List<RatingDTO> getRatings(@PathVariable int id) {
        return List.of(
                new RatingDTO()
                .setId(1)
                .setValue(10)
                .setRatingDate(LocalDate.of(2024,4,10))
                .setRatingAuthor(new User().setId(1).setEmail("abc@abc.com"))
        );
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addRating(@RequestBody RatingDTO rating) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new StatusResponseDTO(201));
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<Object> editRating(@PathVariable int id, @RequestBody RatingDTO rating) {
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO(200));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteRating(@RequestBody RatingDTO rating) {
        return ResponseEntity.status(HttpStatus.OK).body(new StatusResponseDTO(200));
    }
}
