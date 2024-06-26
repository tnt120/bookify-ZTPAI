package com.bookify.backend.service.impl;

import com.bookify.backend.api.external.response.GenreResponse;
import com.bookify.backend.api.internal.Genre;
import com.bookify.backend.api.internal.User;
import com.bookify.backend.mapper.GenreMapper;
import com.bookify.backend.repository.BookRepository;
import com.bookify.backend.repository.GenreRepository;
import com.bookify.backend.service.BookService;
import com.bookify.backend.service.GenreService;
import com.bookify.backend.specification.GenreSpecification;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

import static com.bookify.backend.handler.BusinessErrorCodes.*;

@Service
@RequiredArgsConstructor
public class GenreServiceImpl implements GenreService {
    private final GenreRepository genreRepository;
    private final GenreMapper genreMapper;
    private final BookRepository bookRepository;
    private final BookService bookService;

    @Override
    public List<GenreResponse> getAllGenres(String sortBy, String order, String name) {
        Sort sort = order.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        Specification<Genre> spec = Specification.where(null);

        if (name != null) spec = spec.and(GenreSpecification.nameContains(name));

        return genreRepository.findAll(spec, sort)
                .stream()
                .map(genreMapper::map)
                .toList();
    }

    @Override
    public Integer save(GenreResponse genre) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!Objects.equals(user.getRole().getName(), "ADMIN")) {
            throw NO_PERMISSION.getError();
        }

        genreRepository.findGenreByName(genre.getName())
                .ifPresent(g -> {
                    throw GENRE_ALREADY_EXISTS.getError();
                });

        return genreRepository.save(genreMapper.map(genre)).getId();
    }

    @Override
    public Integer update(Integer genreId, GenreResponse request) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!Objects.equals(user.getRole().getName(), "ADMIN")) {
            throw NO_PERMISSION.getError();
        }

        Genre genre = genreRepository.findById(genreId)
                .orElseThrow(GENRE_NOT_FOUND::getError);

        if (request.getName() != null) {
            genre.setName(request.getName());
        }

        return genreRepository.save(genre).getId();
    }

    @Override
    @Transactional
    public Integer delete(Integer id) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!Objects.equals(user.getRole().getName(), "ADMIN")) {
            throw NO_PERMISSION.getError();
        }

        Genre genre = genreRepository.findById(id)
                .orElseThrow(GENRE_NOT_FOUND::getError);

        bookRepository.findByGenre(genre).ifPresent(bookService::deleteAssociated);
        bookRepository.deleteAllByGenre(genre);

        genreRepository.delete(genre);

        return id;
    }
}
