package com.lerneon.backend.configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.lerneon.backend.models.properties.UploadProperties;

import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
public class WebConfiguration implements WebMvcConfigurer {
    private final UploadProperties uploadProperties;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/stream/**")
                .addResourceLocations("file:" + uploadProperties.getVideoDirectory() + "/");
        registry.addResourceHandler("/uploads/images/**")
                .addResourceLocations("file:" + uploadProperties.getImageDirectory() + "/");
    }
}
