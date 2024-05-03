package com.bookify.backend.service.impl;

import com.bookify.backend.api.external.GenreDTO;
import com.bookify.backend.mapper.GenreMapper;
import com.bookify.backend.repository.GenreRepository;
import com.bookify.backend.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GenreServiceImpl implements GenreService {
    private final GenreRepository genreRepository;
    private final GenreMapper genreMapper;

    @Override
    public List<GenreDTO> getAllGenres() {
        return genreRepository.findAll()
                .stream()
                .map(genreMapper::map)
                .toList();
    }
}
