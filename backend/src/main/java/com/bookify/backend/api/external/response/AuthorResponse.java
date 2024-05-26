package com.bookify.backend.api.external.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@NoArgsConstructor
public class AuthorResponse {
    private Integer id;
    private String firstName;
    private String lastName;
}
