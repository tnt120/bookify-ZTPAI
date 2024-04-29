package com.bookify.backend.handler;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.io.IOException;

@Getter
@AllArgsConstructor
@JsonSerialize(using = BusinessErrorCodes.ErrorSerializer.class)
public enum BusinessErrorCodes {

    NO_CODE(0, "No code", HttpStatus.NOT_IMPLEMENTED),
    INCORRECT_CURRENT_PASSWORD(300, "Current password is incorrect", HttpStatus.BAD_REQUEST),
    BAD_CREDENTIALS(301, "Login and / or password is incorrect", HttpStatus.FORBIDDEN),
    ALREADY_EXIST(302, "User with provided email already exists", HttpStatus.CONFLICT),
    ROLE_NOT_FOUND(303, "Request role not found", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(304, "User not found", HttpStatus.NOT_FOUND),
    INVALID_TOKEN(305, "Invalid token", HttpStatus.UNAUTHORIZED),
    ;

    private final int code;
    private final String description;
    private final HttpStatus httpStatus;

    public ExceptionResponse getError() {
        return new ExceptionResponse(this);
    }

public static class ErrorSerializer extends JsonSerializer<BusinessErrorCodes> {

    @Override
    public void serialize(BusinessErrorCodes value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeStartObject();
        gen.writeStringField("message", value.getDescription());
        gen.writeNumberField("code", value.getCode());
        gen.writeEndObject();
    }
}
}