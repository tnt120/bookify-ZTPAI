package com.bookify.backend.service.impl;

import com.bookify.backend.api.external.response.BookBookcaseResponse;
import com.bookify.backend.api.external.response.PageResponse;
import com.bookify.backend.api.internal.BookcaseType;
import com.bookify.backend.api.internal.User;
import com.bookify.backend.api.internal.UserBook;
import com.bookify.backend.mapper.BookcaseMapper;
import com.bookify.backend.repository.BookcaseTypeRepository;
import com.bookify.backend.repository.UserBookRepository;
import com.bookify.backend.service.BookcaseService;
import com.bookify.backend.service.RatingService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.bookify.backend.handler.BusinessErrorCodes.BOOKCASE_TYPE_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class BookcaseServiceImpl implements BookcaseService {
    private final UserBookRepository userBookRepository;
    private final BookcaseTypeRepository bookcaseTypeRepository;
    private final BookcaseMapper bookcaseMapper;
    private final RatingService ratingService;

    @Override
    @Transactional
    public PageResponse<BookBookcaseResponse> getUserBooks(Integer bookcaseId, Integer page, Integer size, String sortBy, String order) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        BookcaseType bookcaseType = bookcaseTypeRepository.findById(bookcaseId)
                .orElseThrow(BOOKCASE_TYPE_NOT_FOUND::getError);

        Sort sort = order.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<UserBook> userBooks = userBookRepository.findByUserAndBookcaseType(user, bookcaseType, pageable);

        List<BookBookcaseResponse> booksBookcaseResponse = userBooks.stream()
                .map(userBook -> {
                    BookBookcaseResponse response = bookcaseMapper.map(userBook);
                    response.getBook().setAvgRating(ratingService.getAvgRating(userBook.getBook().getId()));
                    return response;
                })
                .toList();

        return new PageResponse<BookBookcaseResponse>()
                .setContent(booksBookcaseResponse)
                .setCurrentPage(userBooks.getNumber())
                .setPageSize(userBooks.getSize())
                .setTotalElements(userBooks.getTotalElements())
                .setTotalPages(userBooks.getTotalPages())
                .setLast(userBooks.isLast())
                .setFirst(userBooks.isFirst());
    }
}
