package com.lerneon.backend.services;

import java.util.List;

import com.lerneon.backend.models.entity.Module;
import com.lerneon.backend.models.payload.request.ModuleRequest;

public interface ModuleService {
    List<Module> findAllModuleByCourseId(Integer courseId);

    Module findModuleById(Integer id);

    Module createModule(ModuleRequest moduleRequest);

    Module updateModule(Integer id, ModuleRequest moduleRequest);

    Module updateOrderNumber(Integer id, Integer target);

    Module deleteModule(Integer id);
}
