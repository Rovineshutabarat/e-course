package com.lerneon.backend.services.implementations;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.lerneon.backend.events.producer.TranscodeEventProducer;
import com.lerneon.backend.models.entity.Resource;
import com.lerneon.backend.models.event.TranscodeEvent;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.models.payload.request.ResourceRequest;
import com.lerneon.backend.models.payload.request.UpdateResourceOrderNumberRequest;
import com.lerneon.backend.models.properties.UploadProperties;
import com.lerneon.backend.repositories.ResourceRepository;
import com.lerneon.backend.services.ModuleService;
import com.lerneon.backend.services.ResourceService;
import com.lerneon.backend.services.UploadVideoService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResourceServiceImpl implements ResourceService {
    private final ResourceRepository resourceRepository;
    private final UploadVideoService uploadVideoService;
    private final UploadProperties uploadProperties;
    private final ModuleService moduleService;
    private final TranscodeEventProducer transcodeEventProducer;

    @Override
    public Resource getResourceById(Integer id) {
        return resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource was not found."));
    }

    @Override
    public void createResource(ResourceRequest resourceRequest) {
        String source = uploadVideoService.uploadVideo(resourceRequest.getVideo());
        String destination = uploadProperties.getVideoDirectory()
                .concat("/")
                .concat(UUID.randomUUID().toString());

        Resource resource = resourceRepository.save(Resource.builder()
                .title(resourceRequest.getTitle())
                .orderNumber(resourceRepository.getLastOrderNumber(resourceRequest.getModuleId()) + 1)
                .url(destination)
                .isAvailable(false)
                .module(moduleService.getModuleById(resourceRequest.getModuleId()))
                .build());

        TranscodeEvent transcodeEvent = TranscodeEvent.builder()
                .source(source)
                .destination(destination)
                .resourceId(resource.getId())
                .retryCount(0)
                .build();

        transcodeEventProducer.publishLowResolutionEvent(transcodeEvent);
        transcodeEventProducer.publishMediumResolutionEvent(transcodeEvent);
        transcodeEventProducer.publishHighResolutionEvent(transcodeEvent);

    }

    @Override
    public Resource activateResource(Integer id) {
        Resource resource = getResourceById(id);

        if (resource.getIsAvailable()) {
            return resource;
        }

        String url = resource.getUrl().concat("/").concat("master.m3u8");
        resource.setUrl(url);
        resource.setIsAvailable(true);
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
        Resource resource = getResourceById(id);
        resourceRepository.delete(resource);
        return resource;
    }
}
