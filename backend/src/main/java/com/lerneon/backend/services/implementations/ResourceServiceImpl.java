package com.lerneon.backend.services.implementations;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.lerneon.backend.events.producer.TranscodeEventProducer;
import com.lerneon.backend.models.entity.Resource;
import com.lerneon.backend.models.entity.TranscodeEvent;
import com.lerneon.backend.models.enums.VideoResolution;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.models.payload.request.ResourceRequest;
import com.lerneon.backend.models.payload.request.UpdateResourceOrderNumberRequest;
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
    private final UploadVideoService uploadVideoService;
    private final UploadProperties uploadProperties;
    private final ModuleService moduleService;
    private final TranscodeEventProducer transcodeEventProducer;

    @Override
    public Resource findResourceById(Integer id) {
        return resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource was not found."));
    }

    @Override
    public void createResource(ResourceRequest resourceRequest) {
        String source = uploadVideoService.uploadVideo(resourceRequest.getVideo());
        String destination = uploadProperties.getVideoDirectory()
                .concat("/")
                .concat(UUID.randomUUID().toString());

        Resource resource = resourceRepository.save(
                Resource.builder()
                        .title(resourceRequest.getTitle())
                        .orderNumber(resourceRepository.getLastOrderNumber(resourceRequest.getModuleId()) + 1)
                        .url(destination)
                        .isAvailabe(false)
                        .module(moduleService.findModuleById(resourceRequest.getModuleId()))
                        .build());

        transcodeEventProducer.sendLowResolutionEvent(TranscodeEvent.builder()
                .source(source)
                .destination(destination)
                .videoResolution(VideoResolution.LOW)
                .resource(resource)
                .build());
    }

    @Override
    public Resource saveResource(Resource resource) {
        return resourceRepository.save(resource);
    }

    @Override
    public Resource updateResource(Integer id, ResourceRequest resourceRequest) {
        return null;
    }

    @Override
    public void updateResourceOrderNumber(Integer id, UpdateResourceOrderNumberRequest request) {
        if (request.getCurrent().equals(request.getTarget())) {
            return;
        }

        if (request.getTarget() < request.getCurrent()) {
            resourceRepository.shiftOrderUp(request.getModuleId(), request.getTarget(), request.getCurrent());
        } else {
            resourceRepository.shiftOrderDown(request.getModuleId(), request.getTarget(), request.getCurrent());
        }

        resourceRepository.updateOrderNumber(id, request.getTarget());
    }

    @Override
    public Resource deleteResource(Integer id) {
        Resource resource = findResourceById(id);
        resourceRepository.delete(resource);
        return resource;
    }
}
