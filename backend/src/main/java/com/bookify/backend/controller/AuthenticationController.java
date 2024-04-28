package com.bookify.backend.controller;

import com.bookify.backend.api.external.AuthenticationRequest;
import com.bookify.backend.api.external.AuthenticationResponse;
import com.bookify.backend.api.external.RegisterRequest;
import com.bookify.backend.api.external.UserDTO;
import com.bookify.backend.handler.UserAlreadyExistsException;
import com.bookify.backend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) throws UserAlreadyExistsException {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/verify")
    public ResponseEntity<UserDTO> verify(@RequestHeader("Authorization") String jwtToken) {
        return ResponseEntity.ok(authService.verify(jwtToken));
    }
}
