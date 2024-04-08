package com.bookify.backend.repository;

import com.bookify.backend.api.internal.BookcaseType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookcaseTypeRepository extends JpaRepository<BookcaseType, Integer> {
}
