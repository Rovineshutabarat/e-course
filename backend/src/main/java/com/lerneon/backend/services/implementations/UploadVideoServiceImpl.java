package com.lerneon.backend.services.implementations;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import com.lerneon.backend.models.exceptions.UploadException;
import com.lerneon.backend.models.properties.UploadProperties;
import com.lerneon.backend.services.UploadVideoService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

// implement chunk upload
@Service
@AllArgsConstructor
@Slf4j
public class UploadVideoServiceImpl implements UploadVideoService {

    private final UploadProperties uploadProperties;

    @Override
    public String uploadVideo(MultipartFile video) {
        try {
            validateVideo(video);

            Path dir = Path.of(uploadProperties.getTemporaryVideoDirectory());
            Files.createDirectories(dir);

            String ext = extractExtension(video.getOriginalFilename());

            Path filePath = dir.resolve(UUID.randomUUID() + ext).normalize();

            if (!filePath.startsWith(dir)) {
                throw new UploadException("Invalid path");
            }

            try (InputStream input = video.getInputStream()) {
                Files.copy(input, filePath, StandardCopyOption.REPLACE_EXISTING);
            }

            return filePath.toString();

        } catch (UploadException e) {
            throw e;
        } catch (Exception e) {
            log.error("Upload video failed", e);
            throw new UploadException("Failed to upload video");
        }
    }

    // consider to using method overloading so this method can accept file or folder
    // path
    @Override
    public void deleteVideo(String path) {
        try {
            if (path == null || path.isBlank())
                return;

            Path filePath = Path.of(path).normalize();

            Files.deleteIfExists(filePath);

        } catch (Exception e) {
            log.error("Delete video failed: {}", path, e);
            throw new UploadException("Failed to delete video");
        }
    }

    private void validateVideo(MultipartFile file) {
        long maxSize = uploadProperties.getMaxVideoSize().toBytes();
        String contentType = file.getContentType();

        if (file == null || file.isEmpty()) {
            throw new UploadException("File is empty");
        }

        if (file.getOriginalFilename() == null) {
            throw new UploadException("Invalid file name");
        }

        if (file.getSize() > maxSize) {
            throw new UploadException("File too large");
        }

        if (contentType == null || !uploadProperties.getAllowedExtension().contains(contentType.toLowerCase())) {
            throw new UploadException("Invalid video mime type" + contentType);
        }
    }

    private String extractExtension(String filename) {
        String clean = Path.of(filename).getFileName().toString();
        int idx = clean.lastIndexOf(".");
        if (idx == -1) {
            throw new UploadException("File has no extension");
        }
        return clean.substring(idx).toLowerCase();
    }

    @Override
    public void cleanDirectory(String destination) throws FileNotFoundException {
        File dir = new File(destination);
        boolean deleted = FileSystemUtils.deleteRecursively(dir);

        if (!deleted) {
            log.error("Failed to delete directory: {}", dir.getAbsolutePath());
            throw new FileNotFoundException("Video source tidak ditemukan: ");
        }
    }

}