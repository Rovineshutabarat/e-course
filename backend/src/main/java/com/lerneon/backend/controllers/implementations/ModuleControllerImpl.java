package com.lerneon.backend.controllers.implementations;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lerneon.backend.controllers.ModuleController;
import com.lerneon.backend.handlers.ResponseHandler;
import com.lerneon.backend.models.entity.Module;
import com.lerneon.backend.models.payload.request.ModuleRequest;
import com.lerneon.backend.models.payload.request.UpdateModuleOrderNumberRequest;
import com.lerneon.backend.models.payload.response.common.SuccessResponse;
import com.lerneon.backend.services.ModuleService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/module")
@AllArgsConstructor
public class ModuleControllerImpl implements ModuleController {
        private final ModuleService moduleService;

        @PostMapping
        @Override
        public ResponseEntity<SuccessResponse<Module>> createModule(
                        @RequestBody @Valid ModuleRequest moduleRequest) {
                return ResponseHandler.buildSuccessResponse(
                                HttpStatus.CREATED,
                                "Success creating module",
                                moduleService.createModule(moduleRequest));
        }

        @PutMapping("/{id}")
        @Override
        public ResponseEntity<SuccessResponse<Module>> updateModule(@PathVariable Integer id,
                        @RequestBody @Valid ModuleRequest moduleRequest) {
                return ResponseHandler.buildSuccessResponse(
                                HttpStatus.OK,
                                "Success updating module",
                                moduleService.updateModule(id, moduleRequest));
        }

        @PutMapping("/{id}/update-order")
        @Override
        public ResponseEntity<SuccessResponse<List<Module>>> updateModuleOrderNumber(
                        @PathVariable Integer id,
                        @RequestBody UpdateModuleOrderNumberRequest updateModuleOrderNumberRequest) {
                return ResponseHandler.buildSuccessResponse(
                                HttpStatus.OK,
                                "Success updating module order number",
                                moduleService.updateModuleOrderNumber(id, updateModuleOrderNumberRequest));
        }

        @DeleteMapping("/{id}")
        @Override
        public ResponseEntity<SuccessResponse<Module>> deleteModule(@PathVariable Integer id) {
                return ResponseHandler.buildSuccessResponse(
                                HttpStatus.OK,
                                "Success deleting module",
                                moduleService.deleteModule(id));
        }

}
