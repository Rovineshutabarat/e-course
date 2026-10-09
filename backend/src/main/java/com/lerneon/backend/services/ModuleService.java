package com.lerneon.backend.services;

import java.util.List;

import com.lerneon.backend.models.entity.Module;
import com.lerneon.backend.models.payload.request.ModuleRequest;
import com.lerneon.backend.models.payload.request.UpdateModuleOrderNumberRequest;
import com.lerneon.backend.models.payload.response.ModuleResponse;

public interface ModuleService {
    Module getModuleById(Integer id);

    List<ModuleResponse> getAllModuleByCourseSlug(String slug);

    Module createModule(ModuleRequest moduleRequest);

    Module updateModule(Integer id, ModuleRequest moduleRequest);

    void updateModuleOrderNumber(Integer id, UpdateModuleOrderNumberRequest updateModuleOrderNumberRequest);

    Module deleteModule(Integer id);
}
