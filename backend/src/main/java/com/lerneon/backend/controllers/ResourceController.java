package com.lerneon.backend.controllers;

import org.springframework.http.ResponseEntity;

import com.lerneon.backend.models.entity.Resource;
import com.lerneon.backend.models.payload.request.ResourceRequest;
import com.lerneon.backend.models.payload.request.UpdateResourceOrderNumberRequest;
import com.lerneon.backend.models.payload.response.common.SuccessResponse;

public interface ResourceController {
    ResponseEntity<SuccessResponse<Resource>> findResourceById(Integer id);

    ResponseEntity<SuccessResponse<Void>> createResource(ResourceRequest resourceRequest);

    ResponseEntity<SuccessResponse<Resource>> updateResource(Integer id, ResourceRequest resourceRequest);

    ResponseEntity<SuccessResponse<Void>> updateResourceOrderNumber(Integer id,
            UpdateResourceOrderNumberRequest updateResourceOrderNumberRequest);

    ResponseEntity<SuccessResponse<Resource>> deleteResource(Integer id);
}
