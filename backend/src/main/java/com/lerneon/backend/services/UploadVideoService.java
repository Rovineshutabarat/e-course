package com.lerneon.backend.services;

import java.io.FileNotFoundException;

import org.springframework.web.multipart.MultipartFile;

public interface UploadVideoService {
    String uploadVideo(MultipartFile video);

    void deleteVideo(String path);

    void cleanDirectory(String destination) throws FileNotFoundException;
}
