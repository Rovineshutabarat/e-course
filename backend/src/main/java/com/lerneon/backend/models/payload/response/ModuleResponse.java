package com.lerneon.backend.models.payload.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ModuleResponse {
    private Integer id;
    private String title;
    private Integer prderNumber;
    private List<ResourceResponse> resources;
}
