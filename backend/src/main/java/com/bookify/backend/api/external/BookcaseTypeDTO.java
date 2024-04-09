package com.bookify.backend.api.external;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class BookcaseTypeDTO {
    private Integer id;
    private String name;
}
