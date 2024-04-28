package com.bookify.backend.mapper;

import com.bookify.backend.api.external.UserDTO;

import com.bookify.backend.api.internal.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDTO map(User userDetails) {
        return UserDTO.builder()
                .id(userDetails.getId())
                .email(userDetails.getEmail())
                .role(userDetails.getRole().getName())
                .build();
    }
}
