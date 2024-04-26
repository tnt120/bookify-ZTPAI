package com.bookify.backend.service.impl;

import com.bookify.backend.api.external.AuthenticationRequest;
import com.bookify.backend.api.external.AuthenticationResponse;
import com.bookify.backend.api.external.RegisterRequest;
import com.bookify.backend.api.internal.MyUserDetails;
import com.bookify.backend.api.internal.Role;
import com.bookify.backend.api.internal.User;
import com.bookify.backend.handler.UserAlreadyExistsException;
import com.bookify.backend.repository.RoleRepository;
import com.bookify.backend.repository.UserDetailsRepository;
import com.bookify.backend.repository.UserRepository;
import com.bookify.backend.service.AuthenticationService;
import com.bookify.backend.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.bookify.backend.handler.BusinessErrorCodes.ALREADY_EXIST;
import static com.bookify.backend.handler.BusinessErrorCodes.ROLE_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final UserDetailsRepository userDetailsRepository;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

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
                .build();
        userRepository.save(user);

        var userDetails = MyUserDetails.builder()
                        .firstName(request.getFirstName())
                        .lastName(request.getLastName())
                        .user(user)
                        .build();
        userDetailsRepository.save(userDetails);

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
}
