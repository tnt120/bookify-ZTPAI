package com.bookify.backend.api.external;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
@Builder
@AllArgsConstructor
public class UserDTO {
    private Integer id;
    private String email;
    private String role;
    private String firstName;
    private String lastName;
}
