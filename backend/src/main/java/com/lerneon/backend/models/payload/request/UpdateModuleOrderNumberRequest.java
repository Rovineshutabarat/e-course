package com.lerneon.backend.models.payload.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateModuleOrderNumberRequest {
    private Integer courseId;
    private Integer current;
    private Integer target;
}
