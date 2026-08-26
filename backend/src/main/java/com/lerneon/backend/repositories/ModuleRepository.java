package com.lerneon.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.lerneon.backend.models.entity.Module;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Integer> {
        @Query("SELECT m FROM Module m WHERE m.course.id = :courseId ORDER BY m.orderNumber ASC")
        List<Module> findAllByCourseId(Integer courseId);

        @Query("SELECT m FROM Module m WHERE m.course.slug = :slug ORDER BY m.orderNumber ASC")
        List<Module> findAllByCourseSlug(@Param("slug") String slug);

        @Modifying(clearAutomatically = true)
        @Query("UPDATE Module m SET m.orderNumber = m.orderNumber + 1 " +
                        "WHERE m.course.id = :courseId AND m.orderNumber >= :target AND m.orderNumber < :current")
        void shiftOrderUp(Integer courseId, Integer target, Integer current);

        @Modifying(clearAutomatically = true)
        @Query("UPDATE Module m SET m.orderNumber = m.orderNumber - 1 " +
                        "WHERE m.course.id = :courseId AND m.orderNumber <= :target AND m.orderNumber > :current")
        void shiftOrderDown(Integer courseId, Integer target, Integer current);

        @Modifying(clearAutomatically = true)
        @Query("UPDATE Module m SET m.orderNumber = :target WHERE m.id = :id")
        void updateOrderNumber(Integer id, Integer target);

        @Query("SELECT COALESCE(MAX(m.orderNumber), 0) FROM Module m WHERE m.course.id = :courseId")
        Integer getLastOrderNumber(Integer courseId);
}
