package com.bookify.backend.service.impl;

import com.bookify.backend.api.external.response.AuthorResponse;
import com.bookify.backend.api.internal.Author;
import com.bookify.backend.api.internal.User;
import com.bookify.backend.mapper.AuthorMapper;
import com.bookify.backend.repository.AuthorRepository;
import com.bookify.backend.repository.BookRepository;
import com.bookify.backend.service.AuthorService;
import com.bookify.backend.service.BookService;
import com.bookify.backend.specification.AuthorSpecification;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

import static com.bookify.backend.handler.BusinessErrorCodes.AUTHOR_NOT_FOUND;
import static com.bookify.backend.handler.BusinessErrorCodes.NO_PERMISSION;

@Service
@RequiredArgsConstructor
public class AuthorServiceImpl implements AuthorService {
    private final AuthorRepository authorRepository;
    private final AuthorMapper authorMapper;
    private final BookRepository bookRepository;
    private final BookService bookService;

    @Override
    public List<AuthorResponse> getAllAuthors(String sortBy, String order, String firstName, String lastName) {
        Sort sort = order.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        Specification<Author> spec = Specification.where(null);

        if (firstName != null) spec = spec.and(AuthorSpecification.firstNameContains(firstName));
        if (lastName != null) spec = spec.and(AuthorSpecification.lastNameContains(lastName));

        return authorRepository.findAll(spec, sort)
                .stream()
                .map(authorMapper::map)
                .toList();
    }

    @Override
    public Integer save(AuthorResponse authorResponse) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!Objects.equals(user.getRole().getName(), "ADMIN")) {
            throw NO_PERMISSION.getError();
        }

        return authorRepository.save(authorMapper.map(authorResponse)).getId();
    }

    @Override
    public Integer update(Integer authorId, AuthorResponse request) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!Objects.equals(user.getRole().getName(), "ADMIN")) {
            throw NO_PERMISSION.getError();
        }

        Author author = authorRepository.findById(authorId)
                .orElseThrow(AUTHOR_NOT_FOUND::getError);

        if (request.getFirstName() != null) {
            author.setFirstName(request.getFirstName());
        }

        if (request.getLastName() != null) {
            author.setLastName(request.getLastName());
        }

        return authorRepository.save(author).getId();
    }

    @Override
    @Transactional
    public Integer delete(Integer id) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!Objects.equals(user.getRole().getName(), "ADMIN")) {
            throw NO_PERMISSION.getError();
        }

        Author author = authorRepository.findById(id)
                .orElseThrow(AUTHOR_NOT_FOUND::getError);


        bookRepository.findByAuthor(author).ifPresent(bookService::deleteAssociated);
        bookRepository.deleteAllByAuthor(author);

        authorRepository.delete(author);

        return id;
    }
}
