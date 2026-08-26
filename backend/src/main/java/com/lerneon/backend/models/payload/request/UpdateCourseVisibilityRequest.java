package com.lerneon.backend.models.payload.request;

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
public class UpdateCourseVisibilityRequest {
    @ValidEnum(enumClass = Visibility.class,
            message = "Course Visibility must be one of: PRIVATE, PUBLIC, SUSPENDED")
    private String visibility;
}
