package com.bookify.backend.service.impl;

import com.bookify.backend.api.external.GenreDTO;
import com.bookify.backend.api.internal.Genre;
import com.bookify.backend.mapper.GenreMapper;
import com.bookify.backend.repository.GenreRepository;
import com.bookify.backend.service.GenreService;
import com.bookify.backend.specification.GenreSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GenreServiceImpl implements GenreService {
    private final GenreRepository genreRepository;
    private final GenreMapper genreMapper;

    @Override
    public List<GenreDTO> getAllGenres(String sortBy, String order, String name) {
        Sort sort = order.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        Specification<Genre> spec = Specification.where(null);

        if (name != null) spec = spec.and(GenreSpecification.nameContains(name));

        return genreRepository.findAll(spec, sort)
                .stream()
                .map(genreMapper::map)
                .toList();
    }
}
