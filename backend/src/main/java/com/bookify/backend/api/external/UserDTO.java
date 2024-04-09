package com.bookify.backend.api.external;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class UserDTO {
    private Integer id;
    private String email;
}
