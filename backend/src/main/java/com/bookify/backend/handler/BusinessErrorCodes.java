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
    AUTHOR_NOT_FOUND(305, "Author not found", HttpStatus.NOT_FOUND),
    GENRE_NOT_FOUND(306, "Genre not found", HttpStatus.NOT_FOUND),
    BOOK_NOT_FOUND(307, "Book not found", HttpStatus.NOT_FOUND),
    BOOKCASE_TYPE_NOT_FOUND(308, "Bookcase type not found", HttpStatus.NOT_FOUND),
    USER_BOOK_NOT_FOUND(309, "User book not found", HttpStatus.NOT_FOUND),
    RATING_NOT_FOUND(310, "Rating not found", HttpStatus.NOT_FOUND),
    COMMENT_NOT_FOUND(311, "Comment not found", HttpStatus.NOT_FOUND),
    INVALID_TOKEN(312, "Invalid token", HttpStatus.UNAUTHORIZED),
    INVALID_USER(313, "Invalid user", HttpStatus.UNAUTHORIZED),
    INVALID_RATING_VALUE(314, "Rating value must be between 1 and 10", HttpStatus.BAD_REQUEST),
    EMPTY_COMMENT(315, "Comment cannot be empty", HttpStatus.BAD_REQUEST),
    NO_PERMISSION(316, "You do not have permission to perform this operation", HttpStatus.BAD_REQUEST),
    GENRE_ALREADY_EXISTS(317, "Genre with provided name already exists", HttpStatus.CONFLICT),
    COMMENT_ALREADY_EXISTS(318, "You have already added a comment to this book", HttpStatus.CONFLICT),
    RATING_ALREADY_EXISTS(319, "You have already rated this book", HttpStatus.CONFLICT),
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
