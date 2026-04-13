package com.lerneon.backend.services.implementations;

import java.util.List;

import org.springframework.stereotype.Service;

import com.lerneon.backend.models.entity.Course;
import com.lerneon.backend.models.entity.Module;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.models.payload.request.ModuleRequest;
import com.lerneon.backend.repositories.ModuleRepository;
import com.lerneon.backend.services.CourseService;
import com.lerneon.backend.services.ModuleService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ModuleServiceImpl implements ModuleService {
    private final ModuleRepository moduleRepository;
    private final CourseService courseService;

    @Override
    public List<Module> findAllModuleByCourseId(Integer courseId) {
        return moduleRepository.findAllByCourseId(courseId);
    }

    @Override
    public Module findModuleById(Integer id) {
        return moduleRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Module was not found."));
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
        findModuleById(id);
        Course course = courseService.findCourseById(moduleRequest.getCourseId());

        return moduleRepository.save(Module.builder()
                .id(id)
                .title(moduleRequest.getTitle())
                .orderNumber(moduleRepository.getLastOrderNumber(course.getId()) + 1)
                .course(course)
                .build());
    }

    @Transactional
    @Override
    public Module updateOrderNumber(Integer id, Integer target) {
        Module module = findModuleById(id);
        Integer currentOrder = module.getOrderNumber();
        Integer courseId = module.getCourse().getId();

        if (currentOrder.equals(target)) {
            return module;
        }

        Module targetModule = moduleRepository.findByCourseIdAndOrderNumber(courseId, target)
                .orElseThrow(() -> new ResourceNotFoundException("Module was not found."));

        module.setOrderNumber(target);
        targetModule.setOrderNumber(currentOrder);

        moduleRepository.saveAll(List.of(module, targetModule));

        return module;
    }

    @Override
    public Module deleteModule(Integer id) {
        Module module = findModuleById(id);
        moduleRepository.delete(module);
        return module;
    }
}
