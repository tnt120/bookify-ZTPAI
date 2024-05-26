package com.bookify.backend.api.external.response;

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
public class UserResponse {
    private Integer id;
    private String email;
    private String role;
    private String firstName;
    private String lastName;
}
