package com.lerneon.backend.services.implementations;

import org.springframework.stereotype.Service;

import com.lerneon.backend.models.entity.Course;
import com.lerneon.backend.models.entity.Module;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.models.payload.request.ModuleRequest;
import com.lerneon.backend.models.payload.request.UpdateModuleOrderNumberRequest;
import com.lerneon.backend.repositories.ModuleRepository;
import com.lerneon.backend.services.CourseService;
import com.lerneon.backend.services.ModuleService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class ModuleServiceImpl implements ModuleService {
    private final ModuleRepository moduleRepository;
    private final CourseService courseService;

    @Override
    public Module findModuleById(Integer id) {
        return moduleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Module was not found."));
    }

    @Override
    public Module createModule(ModuleRequest moduleRequest) {
        Course course = courseService.findCourseById(moduleRequest.getCourseId());

        return moduleRepository.save(Module.builder()
                .title(moduleRequest.getTitle())
                .orderNumber(moduleRepository.getLastOrderNumber(course.getId()) + 1)
                .course(course)
                .build());
    }

    @Override
    public Module updateModule(Integer id, ModuleRequest moduleRequest) {
        Module module = findModuleById(id);
        module.setTitle(moduleRequest.getTitle());

        return moduleRepository.save(module);
    }

    @Override
    @Transactional
    public void updateModuleOrderNumber(Integer id, UpdateModuleOrderNumberRequest request) {
        if (request.getCurrent().equals(request.getTarget())) {
            return;
        }

        if (request.getTarget() < request.getCurrent()) {
            moduleRepository.shiftOrderUp(request.getCourseId(), request.getTarget(), request.getCurrent());
        } else {
            moduleRepository.shiftOrderDown(request.getCourseId(), request.getTarget(), request.getCurrent());
        }

        moduleRepository.updateOrderNumber(id, request.getTarget());
    }

    @Override
    public Module deleteModule(Integer id) {
        Module module = findModuleById(id);
        moduleRepository.delete(module);
        return module;
    }
}
