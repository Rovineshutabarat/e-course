package com.lerneon.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.lerneon.backend.models.entity.Module;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Integer> {
    List<Module> findAllByCourseId(Integer courseId);

    @Query("SELECT COALESCE(MAX(m.orderNumber), 0) FROM Module m WHERE m.course.id = :courseId")
    Integer getLastOrderNumber(Integer courseId);

    Optional<Module> findByCourseIdAndOrderNumber(Integer courseId, Integer orderNumber);
}
