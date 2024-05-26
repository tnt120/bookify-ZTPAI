package com.bookify.backend.service.impl;

import com.bookify.backend.api.external.requests.AuthenticationRequest;
import com.bookify.backend.api.external.response.AuthenticationResponse;
import com.bookify.backend.api.external.requests.RegisterRequest;
import com.bookify.backend.api.external.response.UserResponse;
import com.bookify.backend.api.internal.Role;
import com.bookify.backend.api.internal.User;
import com.bookify.backend.mapper.UserMapper;
import com.bookify.backend.repository.RoleRepository;
import com.bookify.backend.repository.UserRepository;
import com.bookify.backend.service.AuthenticationService;
import com.bookify.backend.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.bookify.backend.handler.BusinessErrorCodes.*;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {

        Role role = roleRepository.findRoleByName("USER")
                .orElseThrow(ROLE_NOT_FOUND::getError);


        if (userRepository.existsByEmail(request.getEmail())) {
            throw ALREADY_EXIST.getError();
        }

        var user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .build();
        userRepository.save(user);

        var jwt = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwt)
                .build();
    }

    @Override
    public AuthenticationResponse login(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findUserByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        var jwt = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwt)
                .build();
    }

    @Override
    public UserResponse verify() {
        var user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return userMapper.map(user);
    }
}
