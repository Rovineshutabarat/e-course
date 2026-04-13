package com.lerneon.backend.services.implementations;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.lerneon.backend.models.entity.Image;
import com.lerneon.backend.models.exceptions.UploadException;
import com.lerneon.backend.models.properties.UploadProperties;
import com.lerneon.backend.repositories.ImageRepository;
import com.lerneon.backend.services.UploadImageService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UploadImageServiceImpl implements UploadImageService {
    private final ImageRepository imageRepository;
    private final UploadProperties uploadImageProperties;

    @Override
    public Image uploadImage(MultipartFile multipartFile) {
        Path dirPath = Path.of(uploadImageProperties.getImageDirectory());

        try {
            if (!Files.exists(dirPath)) {
                Files.createDirectories(dirPath);
            }

            String extension = multipartFile.getOriginalFilename()
                    .substring(multipartFile.getOriginalFilename().lastIndexOf("."));

            Path filePath = dirPath.resolve(UUID.randomUUID().toString().concat(extension));

            if (Files.exists(filePath)) {
                throw new UploadException("Image already exist");
            }

            Files.copy(multipartFile.getInputStream(), filePath,
                    StandardCopyOption.REPLACE_EXISTING);

            return imageRepository
                    .save(Image.builder().fileName(multipartFile.getOriginalFilename())
                            .path(filePath.toString()).build());

        } catch (UploadException e) {
            throw e;
        } catch (Exception e) {
            throw new UploadException(
                    String.format("Failed to upload image -> %s", e.getMessage()));
        }
    }
}
