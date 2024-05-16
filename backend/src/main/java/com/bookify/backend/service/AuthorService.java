package com.bookify.backend.service;

import com.bookify.backend.api.external.AuthorDTO;

import java.util.List;

public interface AuthorService {
    List<AuthorDTO> getAllAuthors(String sortBy, String order, String firstName, String lastName);

    Integer save(AuthorDTO authorDTO);

    Integer update(Integer id, AuthorDTO author);

    Integer delete(Integer id);
}
