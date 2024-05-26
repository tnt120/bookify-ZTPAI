package com.bookify.backend.mapper;

import com.bookify.backend.api.external.response.UserResponse;

import com.bookify.backend.api.internal.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse map(User user) {
        return UserResponse.builder()
                .email(user.getEmail())
                .role(user.getRole().getName())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .id(user.getId())
                .build();
    }
}
