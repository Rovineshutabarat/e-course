package com.lerneon.backend.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.lerneon.backend.models.entity.Module;
import com.lerneon.backend.models.payload.request.ModuleRequest;
import com.lerneon.backend.models.payload.response.common.SuccessResponse;

public interface ModuleController {
    ResponseEntity<SuccessResponse<List<Module>>> findAllModuleByCourseId(Integer courseId);

    ResponseEntity<SuccessResponse<Module>> findModuleById(Integer id);

    ResponseEntity<SuccessResponse<Module>> createModule(ModuleRequest moduleRequest);

    ResponseEntity<SuccessResponse<Module>> updateModule(Integer id, ModuleRequest moduleRequest);

    ResponseEntity<SuccessResponse<Module>> updateOrderNumber(Integer id, Integer target);

    ResponseEntity<SuccessResponse<Module>> deleteModule(Integer id);
}
