package com.bookify.backend.handler;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum BusinessErrorCodes {

    NO_CODE(0, "No code", HttpStatus.NOT_IMPLEMENTED),
    INCORRECT_CURRENT_PASSWORD(300, "Current password is incorrect", HttpStatus.BAD_REQUEST),
    BAD_CREDENTIALS(301, "Login and / or password is incorrect", HttpStatus.FORBIDDEN),
    ALREADY_EXIST(302, "User already exist", HttpStatus.CONFLICT),
    ;

    private final int code;
    private final String description;
    private final HttpStatus httpStatus;
}
