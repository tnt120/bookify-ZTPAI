package com.bookify.backend.handler;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.io.IOException;

@Getter
@AllArgsConstructor
@JsonSerialize(using = BusinessErrorCodes.DistanceSerializer.class)
public enum BusinessErrorCodes {

    NO_CODE(0, "No code", HttpStatus.NOT_IMPLEMENTED),
    INCORRECT_CURRENT_PASSWORD(300, "Current password is incorrect", HttpStatus.BAD_REQUEST),
    BAD_CREDENTIALS(301, "Login and / or password is incorrect", HttpStatus.FORBIDDEN),
    ALREADY_EXIST(302, "User already exist", HttpStatus.CONFLICT),
    ROLE_NOT_FOUND(303, "Request role not found", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(304, "User not found", HttpStatus.NOT_FOUND),
    ;

    private final int code;
    private final String description;
    private final HttpStatus httpStatus;

    public ExceptionResponse getError() {
        return ExceptionResponse.builder()
                .businessErrorCode(this)
                .build();
    }

    public static class DistanceSerializer extends StdSerializer<BusinessErrorCodes> {

        public DistanceSerializer() {
            super(BusinessErrorCodes.class);
        }

        public DistanceSerializer(Class t) {
            super(t);
        }

        public void serialize(
                BusinessErrorCodes businessErrorCodes, JsonGenerator generator, SerializerProvider provider)
                throws IOException {
            generator.writeStartObject();
            generator.writeFieldName("description");
            generator.writeString(businessErrorCodes.getDescription());
            generator.writeFieldName("code");
            generator.writeNumber(businessErrorCodes.getCode());
            generator.writeEndObject();
        }
    }
}
