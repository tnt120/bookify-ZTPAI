package com.bookify.backend.service;

import com.bookify.backend.api.external.BookDTO;
import com.bookify.backend.api.external.requests.BookRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BookService {
    Integer save(BookRequest request);
    List<BookDTO> getAllBooks();
    void uploadCover(Integer bookId, MultipartFile file);
}
