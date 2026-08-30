package com.lerneon.backend.controllers.implementations;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.lerneon.backend.controllers.ResourceController;
import com.lerneon.backend.handlers.ResponseHandler;
import com.lerneon.backend.models.entity.Resource;
import com.lerneon.backend.models.payload.request.ResourceRequest;
import com.lerneon.backend.models.payload.request.UpdateResourceOrderNumberRequest;
import com.lerneon.backend.models.payload.response.common.SuccessResponse;
import com.lerneon.backend.services.ResourceService;
import com.lerneon.backend.services.implementations.TranscodeServiceImpl;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/resource")
@AllArgsConstructor
public class ResourceControllerImpl implements ResourceController {
        private final ResourceService resourceService;
        private final TranscodeServiceImpl transcodeService;

        @GetMapping("/{id}")
        @Override
        public ResponseEntity<SuccessResponse<Resource>> findResourceById(@PathVariable Integer id) {
                return ResponseHandler.buildSuccessResponse(
                                HttpStatus.OK,
                                "Success get resource by id",
                                resourceService.findResourceById(id));
        }

        @GetMapping(path = "/progress/{id}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
        @Override
        public SseEmitter streamTranscodeProgress(Integer transcodeLogId) {
                SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
                transcodeService.registerEmitter(1, emitter);
                return emitter;
        }

        @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        @Override
        public ResponseEntity<SuccessResponse<Void>> createResource(
                        @ModelAttribute @Valid ResourceRequest resourceRequest) {
                resourceService.createResource(resourceRequest);
                return ResponseHandler.buildSuccessResponse(
                                HttpStatus.CREATED,
                                "Success creating resource",
                                null);
        }

        // update this later
        @PutMapping("/{id}")
        @Override
        public ResponseEntity<SuccessResponse<Resource>> updateResource(@PathVariable Integer id,
                        @RequestBody @Valid ResourceRequest resourceRequest) {
                return ResponseHandler.buildSuccessResponse(
                                HttpStatus.OK,
                                "Success updating resource",
                                resourceService.updateResource(id, resourceRequest));
        }

        @PutMapping("/{id}/update-order")
        @Override
        public ResponseEntity<SuccessResponse<Void>> updateResourceOrderNumber(@PathVariable Integer id,
                        @RequestBody @Valid UpdateResourceOrderNumberRequest updateResourceOrderNumberRequest) {
                resourceService.updateResourceOrderNumber(id, updateResourceOrderNumberRequest);
                return ResponseHandler.buildSuccessResponse(
                                HttpStatus.OK,
                                "Success updating resource order number",
                                null);
        }

        @DeleteMapping("/{id}")
        @Override
        public ResponseEntity<SuccessResponse<Resource>> deleteResource(@PathVariable Integer id) {
                return ResponseHandler.buildSuccessResponse(
                                HttpStatus.OK,
                                "Success deleting resource",
                                resourceService.deleteResource(id));
        }

}
