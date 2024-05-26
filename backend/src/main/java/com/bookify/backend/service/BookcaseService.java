package com.bookify.backend.service;

import com.bookify.backend.api.external.requests.UpdateBookcaseRequest;
import com.bookify.backend.api.external.response.BookBookcaseResponse;
import com.bookify.backend.api.external.response.DetailsBookcaseResponse;
import com.bookify.backend.api.external.response.PageResponse;

public interface BookcaseService {
    PageResponse<BookBookcaseResponse> getUserBooks(Integer bookcaseId, Integer page, Integer size, String sortBy, String order);
    DetailsBookcaseResponse getDetailsBookcase(Integer bookId);
    Integer updateUserBook(UpdateBookcaseRequest request);
    Integer deleteUserBook(Integer id);
}
