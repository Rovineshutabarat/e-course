package com.lerneon.backend.controllers.implementations;

import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lerneon.backend.controllers.ResourceController;
import com.lerneon.backend.handlers.ResponseHandler;
import com.lerneon.backend.models.entity.Resource;
import com.lerneon.backend.models.payload.request.ResourceRequest;
import com.lerneon.backend.models.payload.response.common.SuccessResponse;
import com.lerneon.backend.services.ResourceService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/resource")
@AllArgsConstructor
public class ResourceControllerImpl implements ResourceController {
    private final ResourceService resourceService;

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<SuccessResponse<Resource>> findResourceById(@PathVariable Integer id) {
        return ResponseHandler.buildSuccessResponse(
                HttpStatus.OK,
                "Success get resource by id",
                resourceService.findResourceById(id));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Override
    public ResponseEntity<SuccessResponse<Resource>> createResource(@Param("moduleId") Integer moduleId,
            ResourceRequest resourceRequest) {
        return ResponseHandler.buildSuccessResponse(
                HttpStatus.OK,
                "Success creating resource",
                resourceService.createResource(moduleId, resourceRequest));
    }

    @Override
    public ResponseEntity<SuccessResponse<Resource>> deleteResource(Integer id) {
        return null;
    }

    @Override
    public ResponseEntity<SuccessResponse<Resource>> updateResource(Integer id, ResourceRequest resourceRequest) {
        return null;
    }

    @Override
    public ResponseEntity<SuccessResponse<Resource>> updateOrderNumber(Integer id, Integer target) {
        return null;
    }
}
