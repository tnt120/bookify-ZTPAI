package com.bookify.backend.service;

import com.bookify.backend.api.external.response.AuthorResponse;

import java.util.List;

public interface AuthorService {
    List<AuthorResponse> getAllAuthors(String sortBy, String order, String firstName, String lastName);

    Integer save(AuthorResponse authorResponse);

    Integer update(Integer id, AuthorResponse author);

    Integer delete(Integer id);
}
