package com.bookify.backend.service;

import com.bookify.backend.api.external.requests.AuthenticationRequest;
import com.bookify.backend.api.external.response.AuthenticationResponse;
import com.bookify.backend.api.external.requests.RegisterRequest;
import com.bookify.backend.api.external.response.UserResponse;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse login(AuthenticationRequest request);

    UserResponse verify();
}
