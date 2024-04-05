package com.bookify.backend.service;

import com.bookify.backend.api.external.AuthorDTO;
import com.bookify.backend.api.internal.Author;
import com.bookify.backend.mapper.AuthorMapper;
import com.bookify.backend.repository.AuthorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthorServiceImpl implements AuthorService {
    private final AuthorRepository authorRepository;
    private final AuthorMapper authorMapper;

    @Override
    public AuthorDTO get() {

//        authorRepository.findById();
        return null;
    }

    @Override
    public AuthorDTO getByEmail(String email) {
        return authorRepository.findAuthorByEmail(email)
                .map(authorMapper::map)
                .orElseThrow(() -> new RuntimeException("No author with given email found"));
    }

    @Override
    public AuthorDTO save(AuthorDTO authorDTO) {
        Author author = authorRepository.save(authorMapper.map(authorDTO));

        return authorMapper.map(author);
    }
}
