package com.bookify.backend.api.external.response;

import com.bookify.backend.api.external.BookcaseTypeDTO;
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
    private BookcaseTypeDTO bookcaseType;
    private BookResponse book;
    private Integer currentPage;
}
