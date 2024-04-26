package com.bookify.backend.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ExceptionResponse> handleException(BadCredentialsException ex) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BusinessErrorCodes.BAD_CREDENTIALS.getCode())
                                .businessErrorDescription(BusinessErrorCodes.BAD_CREDENTIALS.getDescription())
                                .error(BusinessErrorCodes.BAD_CREDENTIALS.getDescription())
                                .build()
                );
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ExceptionResponse> handleException(UserAlreadyExistsException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorCode(BusinessErrorCodes.ALREADY_EXIST.getCode())
                                .businessErrorDescription(BusinessErrorCodes.ALREADY_EXIST.getDescription())
                                .error(BusinessErrorCodes.ALREADY_EXIST.getDescription())
                                .build()
                );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleException(Exception ex) {
        // log the exception
        ex.printStackTrace();
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(
                        ExceptionResponse.builder()
                                .businessErrorDescription("Internal server error, please try again later")
                                .error(ex.getMessage())
                                .build()
                );
    }
}
