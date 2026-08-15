package com.lerneon.backend.services.implementations;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.lerneon.backend.jobs.payload.VideoTranscoderPayload;
import com.lerneon.backend.jobs.producer.VideoTranscoderProducer;
import com.lerneon.backend.models.entity.Resource;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.models.exceptions.TranscoderException;
import com.lerneon.backend.models.payload.request.ResourceRequest;
import com.lerneon.backend.models.properties.UploadProperties;
import com.lerneon.backend.repositories.ResourceRepository;
import com.lerneon.backend.services.ModuleService;
import com.lerneon.backend.services.ResourceService;
import com.lerneon.backend.services.UploadVideoService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class ResourceServiceImpl implements ResourceService {
    private final ResourceRepository resourceRepository;
    private final VideoTranscoderProducer videoTranscoderProducer;
    private final UploadVideoService uploadVideoService;
    private final UploadProperties uploadProperties;
    private final ModuleService moduleService;

    @Override
    public Resource findResourceById(Integer id) {
        return resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource was not found."));
    }

    @Override
    public Resource createResource(Integer moduleId, ResourceRequest resourceRequest) {
        try {
            String outputDirectory = uploadProperties.getVideoDirectory() + "/" + UUID.randomUUID().toString();

            Files.createDirectories(Paths.get(outputDirectory));

            Resource resource = Resource.builder().title(resourceRequest.getTitle())
                    .orderNumber(resourceRepository.getLastOrderNumber(moduleId) + 1)
                    .url(outputDirectory + "/playlist.m3u8")
                    .module(moduleService.findModuleById(moduleId)).build();

            Resource savedResource = resourceRepository.save(resource);
            VideoTranscoderPayload videoTranscoderPayload = VideoTranscoderPayload.builder()
                    .resourceId(resource.getId())
                    .source(uploadVideoService.uploadVideo(resourceRequest.getVideo()))
                    .outputDirectory(outputDirectory).build();

            videoTranscoderProducer.transcode(videoTranscoderPayload);
            return savedResource;
        } catch (Exception exception) {
            throw new TranscoderException(exception.getMessage());
        }
    }

    @Override
    public List<Resource> bulkCreateResource(List<ResourceRequest> resourceRequests) {
        // return resourceRequests.stream()
        // .map(this::createResource)
        // .collect(Collectors.toList());
        return null;
    }

    @Override
    public Resource updateResource(Integer id, ResourceRequest resourceRequest) {
        return null;
    }

    @Override
    public Resource deleteResource(Integer id) {
        Resource resource = findResourceById(id);
        resourceRepository.delete(resource);
        return resource;
    }
}
