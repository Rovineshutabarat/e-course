package com.lerneon.backend.services;

import org.springframework.web.multipart.MultipartFile;

import com.lerneon.backend.models.entity.Image;

public interface UploadImageService {
    Image uploadImage(MultipartFile multipartFile);

}
