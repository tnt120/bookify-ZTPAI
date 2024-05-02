package com.bookify.backend.service.impl;

import com.bookify.backend.api.external.BookDTO;
import com.bookify.backend.api.internal.User;
import com.bookify.backend.mapper.BookMapper;
import com.bookify.backend.repository.BookRepository;
import com.bookify.backend.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final BookMapper bookMapper;

    @Override
    public List<BookDTO> getAllBooks() {

        var test = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        System.out.println(test.getEmail());

        return bookRepository.findAll()
                .stream().map(bookMapper::map)
                .toList();
    }
}
