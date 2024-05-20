package com.bookify.backend.service;

import com.bookify.backend.api.external.requests.UpdateBookcaseRequest;
import com.bookify.backend.api.external.response.BookBookcaseResponse;
import com.bookify.backend.api.external.response.PageResponse;

public interface BookcaseService {
    PageResponse<BookBookcaseResponse> getUserBooks(Integer bookcaseId, Integer page, Integer size, String sortBy, String order);
    Integer updateUserBook(UpdateBookcaseRequest request);
}
