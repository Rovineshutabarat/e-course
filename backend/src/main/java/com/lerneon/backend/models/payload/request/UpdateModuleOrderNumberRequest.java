package com.lerneon.backend.models.payload.request;

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
public class UpdateModuleOrderNumberRequest {

    @NotNull(message = "courseId is required")
    @Positive(message = "courseId must be a positive number")
    private Integer courseId;

    @NotNull(message = "current is required")
    @PositiveOrZero(message = "current must be zero or a positive number")
    private Integer current;

    @NotNull(message = "target is required")
    @PositiveOrZero(message = "target must be zero or a positive number")
    private Integer target;
}