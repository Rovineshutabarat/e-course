package com.lerneon.backend.models.properties;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.util.unit.DataSize;

import lombok.Data;

@Data
@Component
@ConfigurationProperties(prefix = "upload")
public class UploadProperties {
    private String imageDirectory;
    private String ffmpegDirectory;
    private String videoDirectory;
    private String temporaryVideoDirectory;
    private List<String> allowedExtension;
    private DataSize maxVideoSize;
    private Integer retryMaxAttempts;
    private Integer retryDelayMs;
}
