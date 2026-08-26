package com.lerneon.backend.services;

import org.springframework.web.multipart.MultipartFile;

public interface UploadVideoService {
    String uploadVideo(MultipartFile video);

    void deleteVideo(String path);
}
