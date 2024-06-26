package com.bookify.backend.service;

import com.bookify.backend.api.external.requests.BookRequest;
import com.bookify.backend.api.external.response.BookResponse;
import com.bookify.backend.api.external.response.PageResponse;
import com.bookify.backend.api.internal.Book;
import org.springframework.web.multipart.MultipartFile;

public interface BookService {
    Integer save(BookRequest request);
    Integer update(Integer id, BookRequest request);
    Integer delete(Integer id);
    PageResponse<BookResponse> getAllBooks(Integer page, Integer size, String sortBy, String order, String title, Integer author, Integer genre);
    BookResponse getBook(Integer bookId, Integer userId);
    void uploadCover(Integer bookId, MultipartFile file);
    void deleteAssociated(Book book);
}
