package com.bookify.backend.api.external.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class BookcaseTypeResponse {
    private Integer id;
    private String name;
}
