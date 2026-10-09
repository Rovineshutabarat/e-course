package com.lerneon.backend.repositories.jdbi;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.mapper.reflect.FieldMapper;
import org.springframework.stereotype.Repository;

import com.lerneon.backend.models.payload.response.ModuleResponse;
import com.lerneon.backend.models.payload.response.ResourceResponse;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ModuleJDBIRepository {
    private final Jdbi jdbi;

    public List<ModuleResponse> getAllModuleByCourseSlug(String slug) {
        return jdbi.withHandle(h -> {
            List<ModuleResponse> modules = h.createQuery("""
                    SELECT
                        module.id,
                        module.title,
                        module.order_number
                    FROM modules module
                    JOIN courses course
                        ON module.course_id = course.id
                    WHERE course.slug = :slug
                    ORDER BY module.order_number ASC
                    """)
                    .bind("slug", slug)
                    .map(FieldMapper.of(ModuleResponse.class))
                    .list();

            if (modules.isEmpty()) {
                return modules;
            }

            List<Integer> moduleIds = modules.stream()
                    .map(ModuleResponse::getId)
                    .toList();

            Map<Integer, List<ResourceResponse>> resourcesByModule = h.createQuery("""
                    SELECT
                        resource.id,
                        resource.module_id,
                        resource.title,
                        resource.order_number,
                        resource.url,
                        resource.is_available
                    FROM resources resource
                    WHERE resource.module_id IN (<moduleIds>)
                    ORDER BY resource.order_number ASC
                    """)
                    .bindList("moduleIds", moduleIds)
                    .map(FieldMapper.of(ResourceResponse.class))
                    .list()
                    .stream()
                    .collect(Collectors.groupingBy(ResourceResponse::getModuleId));
            modules.forEach(m -> m.setResources(resourcesByModule.getOrDefault(m.getId(), List.of())));

            return modules;
        });
    }
}
