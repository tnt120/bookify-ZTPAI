package com.bookify.backend.service;

import com.bookify.backend.api.external.AuthenticationRequest;
import com.bookify.backend.api.external.AuthenticationResponse;
import com.bookify.backend.api.external.RegisterRequest;
import com.bookify.backend.api.external.UserDTO;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse login(AuthenticationRequest request);

    UserDTO verify(String jwtToken);
}
