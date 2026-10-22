package com.lerneon.backend.models.payload.request;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

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
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ResourceRequest {

    @NotBlank(message = "title is required")
    private String title;

    @NotNull(message = "moduleId is required")
    @Positive(message = "moduleId must be a positive number")
    private Integer moduleId;

    @NotNull(message = "video is required")
    private MultipartFile video;

    @JsonIgnore
    public void setModule_id(Integer moduleId) {
        this.moduleId = moduleId;
    }
}