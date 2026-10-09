package com.lerneon.backend.models.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResourceResponse {
    private Integer id;
    private Integer moduleId;
    private String title;
    private Integer orderNumber;
    private String url;
    private Boolean isAvailable;
}
