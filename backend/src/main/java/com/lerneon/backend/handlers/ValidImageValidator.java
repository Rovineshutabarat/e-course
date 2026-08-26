package com.lerneon.backend.handlers;

import java.util.Arrays;
import org.springframework.web.multipart.MultipartFile;
import com.lerneon.backend.models.annotations.ValidImage;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ValidImageValidator implements ConstraintValidator<ValidImage, MultipartFile> {

    private long maxSizeBytes;
    private String[] allowedTypes;
    private boolean required;

    @Override
    public void initialize(ValidImage annotation) {
        this.maxSizeBytes = annotation.maxFileSize() * 1024 * 1024;
        this.allowedTypes = annotation.allowedTypes();
        this.required = annotation.required();
    }

    @Override
    public boolean isValid(MultipartFile file, ConstraintValidatorContext context) {
        if (file == null || file.isEmpty()) {
            return !required;
        }

        if (file.getSize() > maxSizeBytes) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    "File size must not exceed " + (maxSizeBytes / (1024 * 1024)) + "MB.")
                    .addConstraintViolation();
            return false;
        }

        String contentType = file.getContentType();
        if (contentType == null || !Arrays.asList(allowedTypes).contains(contentType)) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    "File type must be one of: " + String.join(", ", allowedTypes))
                    .addConstraintViolation();
            return false;
        }

        return true;
    }
}
