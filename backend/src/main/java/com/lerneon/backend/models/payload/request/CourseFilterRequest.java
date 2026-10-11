package com.lerneon.backend.models.payload.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseFilterRequest {
    @Size(max = 150)
    private String slug;

    @Min(1)
    private Integer categoryId;

    private String difficulty;

    @DecimalMin(value = "0.0", inclusive = true)
    private Double minPrice;

    @DecimalMin(value = "0.0", inclusive = true)
    private Double maxPrice;

    @Min(0)
    @Builder.Default
    private Integer page = 0;

    @Min(1)
    @Max(100)
    @Builder.Default
    private Integer size = 10;
}
