package com.bookify.backend.service;

import com.bookify.backend.api.external.AuthenticationRequest;
import com.bookify.backend.api.external.AuthenticationResponse;
import com.bookify.backend.api.external.RegisterRequest;
import com.bookify.backend.handler.UserAlreadyExistsException;

public interface AuthenticationService {
    public AuthenticationResponse register(RegisterRequest request) throws UserAlreadyExistsException;

    public AuthenticationResponse login(AuthenticationRequest request);
}
