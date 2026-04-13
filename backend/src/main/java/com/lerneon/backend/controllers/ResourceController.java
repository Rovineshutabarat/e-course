package com.lerneon.backend.controllers;

import org.springframework.http.ResponseEntity;

import com.lerneon.backend.models.entity.Resource;
import com.lerneon.backend.models.payload.request.ResourceRequest;
import com.lerneon.backend.models.payload.response.common.SuccessResponse;

public interface ResourceController {

    ResponseEntity<SuccessResponse<Resource>> findResourceById(Integer id);

    ResponseEntity<SuccessResponse<Resource>> createResource(Integer moduleId, ResourceRequest resourceRequest);

    ResponseEntity<SuccessResponse<Resource>> updateResource(Integer id, ResourceRequest resourceRequest);

    ResponseEntity<SuccessResponse<Resource>> updateOrderNumber(Integer id, Integer target);

    ResponseEntity<SuccessResponse<Resource>> deleteResource(Integer id);
}
