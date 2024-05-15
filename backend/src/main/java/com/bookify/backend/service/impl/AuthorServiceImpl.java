package com.bookify.backend.service.impl;

import com.bookify.backend.api.external.AuthorDTO;
import com.bookify.backend.api.internal.Author;
import com.bookify.backend.api.internal.User;
import com.bookify.backend.mapper.AuthorMapper;
import com.bookify.backend.repository.AuthorRepository;
import com.bookify.backend.service.AuthorService;
import com.bookify.backend.specification.AuthorSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

import static com.bookify.backend.handler.BusinessErrorCodes.NO_PERMISSION;

@Service
@RequiredArgsConstructor
public class AuthorServiceImpl implements AuthorService {
    private final AuthorRepository authorRepository;
    private final AuthorMapper authorMapper;

    @Override
    public List<AuthorDTO> getAllAuthors(String sortBy, String order, String firstName, String lastName) {
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
    public Integer save(AuthorDTO authorDTO) {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!Objects.equals(user.getRole().getName(), "ADMIN")) {
            throw NO_PERMISSION.getError();
        }

        return authorRepository.save(authorMapper.map(authorDTO)).getId();
    }
}
