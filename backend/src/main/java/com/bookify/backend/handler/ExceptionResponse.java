package com.bookify.backend.handler;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ExceptionResponse extends RuntimeException {
    private BusinessErrorCodes businessErrorCode;
}
