package com.lerneon.backend.models.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import lombok.Data;

@Data
@Component
@ConfigurationProperties(prefix = "upload")
public class UploadImageProperties {
    private String directory;
}
