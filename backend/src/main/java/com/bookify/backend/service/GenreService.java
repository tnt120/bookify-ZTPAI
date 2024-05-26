package com.bookify.backend.service;

import com.bookify.backend.api.external.response.GenreResponse;

import java.util.List;

public interface GenreService {
    List<GenreResponse> getAllGenres(String sortBy, String order, String name);

    Integer save(GenreResponse genreResponse);

    Integer update(Integer id, GenreResponse genre);

    Integer delete(Integer id);
}
