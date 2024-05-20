package com.bookify.backend.api.external.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateBookcaseRequest {
    private Integer bookId;
    private Integer bookcaseId;
    private Integer currentPage;
}
