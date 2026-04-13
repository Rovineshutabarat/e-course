package com.lerneon.backend.models.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UploadVideoResponse {
    private String filePath;
    private String outputDirectory;
}
