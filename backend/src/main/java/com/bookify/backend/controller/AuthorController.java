package com.bookify.backend.controller;

import com.bookify.backend.api.external.AuthorDTO;
import com.bookify.backend.service.AuthorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/author")
@RequiredArgsConstructor
public class AuthorController {
    private final AuthorService authorService;

    @GetMapping
    public AuthorDTO get() {
        return new AuthorDTO().setId(1).setFirstName("a").setLastName("b");
    }

    @GetMapping("/{lastName}")
    public AuthorDTO getByLastName(@PathVariable String lastName) {
        return authorService.getByLastName(lastName);
    }

    @PostMapping
    public AuthorDTO save(@RequestBody AuthorDTO authorDTO) {
        return authorService.save(authorDTO);
    }
}
