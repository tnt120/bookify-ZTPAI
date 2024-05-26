package com.bookify.backend.api.external.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class DetailsBookcaseResponse {
    private Integer id;
    private Integer bookcaseId;
    private BasicRatingResponse rating;
}
