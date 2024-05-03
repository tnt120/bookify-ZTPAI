package com.bookify.backend.service.impl;

import com.bookify.backend.api.external.AuthorDTO;
import com.bookify.backend.api.internal.Author;
import com.bookify.backend.mapper.AuthorMapper;
import com.bookify.backend.repository.AuthorRepository;
import com.bookify.backend.service.AuthorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthorServiceImpl implements AuthorService {
    private final AuthorRepository authorRepository;
    private final AuthorMapper authorMapper;

    @Override
    public List<AuthorDTO> getAllAuthors() {
        return authorRepository.findAll()
                .stream()
                .map(authorMapper::map)
                .toList();
    }

    @Override
    public AuthorDTO save(AuthorDTO authorDTO) {
        Author author = authorRepository.save(authorMapper.map(authorDTO));

        return authorMapper.map(author);
    }
}
