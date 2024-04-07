package com.bookify.backend.service;

import com.bookify.backend.api.external.AuthorDTO;
import com.bookify.backend.api.internal.Author;

public interface AuthorService {
    AuthorDTO get();
    AuthorDTO getByLastName(String lastName);

    AuthorDTO save(AuthorDTO authorDTO);
}
