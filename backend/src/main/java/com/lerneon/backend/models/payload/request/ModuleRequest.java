package com.lerneon.backend.models.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ModuleRequest {

    @NotNull(message = "courseId is required")
    @Positive(message = "courseId must be a positive number")
    private Integer courseId;

    @NotBlank(message = "title is required")
    private String title;
}