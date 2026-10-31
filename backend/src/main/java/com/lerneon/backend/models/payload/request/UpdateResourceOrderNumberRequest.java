package com.lerneon.backend.models.payload.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class UpdateResourceOrderNumberRequest {

    @NotNull(message = "moduleId is required")
    @Positive(message = "moduleId must be a positive number")
    private Integer moduleId;

    @NotNull(message = "current is required")
    @PositiveOrZero(message = "current must be zero or a positive number")
    private Integer current;

    @NotNull(message = "target is required")
    @PositiveOrZero(message = "target must be zero or a positive number")
    private Integer target;
}