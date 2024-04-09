package com.bookify.backend.api.external;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class UserBookDTO {
    private int id;
    private UserDTO user;
    private BookDTO book;
    private BookcaseTypeDTO bookcaseType;
    private Integer currentPage;
}
