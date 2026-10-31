package com.lerneon.backend.models.payload.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.lerneon.backend.models.annotations.ValidEnum;
import com.lerneon.backend.models.enums.Visibility;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class UpdateCourseVisibilityRequest {
    @ValidEnum(enumClass = Visibility.class,
            message = "Course Visibility must be one of: PRIVATE, PUBLIC, SUSPENDED")
    private String visibility;
}
