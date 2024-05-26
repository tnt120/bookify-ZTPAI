package com.bookify.backend.api.external.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class BookBookcaseResponse {
    private Integer id;
    private BookcaseTypeResponse bookcaseType;
    private BookResponse book;
    private Integer currentPage;
}
