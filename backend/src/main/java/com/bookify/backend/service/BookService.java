package com.bookify.backend.service;

import com.bookify.backend.api.external.BookDTO;

import java.util.List;

public interface BookService {
    List<BookDTO> getAllBooks();
}
