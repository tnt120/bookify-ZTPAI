package com.bookify.backend.service;

import com.bookify.backend.api.external.GenreDTO;

import java.util.List;

public interface GenreService {
    List<GenreDTO> getAllGenres(String sortBy, String order, String name);
}
