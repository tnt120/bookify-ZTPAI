package com.bookify.backend.service;

import com.bookify.backend.api.external.AuthorDTO;

import java.util.List;

public interface AuthorService {
    List<AuthorDTO> getAllAuthors();

    Integer save(AuthorDTO authorDTO);
}
