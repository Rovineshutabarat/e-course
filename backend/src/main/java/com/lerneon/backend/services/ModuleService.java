package com.lerneon.backend.services;

import java.util.List;

import com.lerneon.backend.models.entity.Module;
import com.lerneon.backend.models.payload.request.ModuleRequest;
import com.lerneon.backend.models.payload.request.UpdateModuleOrderNumberRequest;

public interface ModuleService {
    Module findModuleById(Integer id);

    Module createModule(ModuleRequest moduleRequest);

    Module updateModule(Integer id, ModuleRequest moduleRequest);

    List<Module> updateModuleOrderNumber(Integer id, UpdateModuleOrderNumberRequest updateModuleOrderNumberRequest);

    Module deleteModule(Integer id);
}
