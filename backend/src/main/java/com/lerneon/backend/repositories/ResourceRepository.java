package com.lerneon.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.lerneon.backend.models.entity.Resource;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Integer> {
        @Query("SELECT r FROM Resource r WHERE r.module.id = :moduleId ORDER BY r.orderNumber ASC")
        List<Resource> findAllByModuleId(Integer moduleId);

        @Modifying(clearAutomatically = true)
        @Query("UPDATE Resource r SET r.orderNumber = r.orderNumber + 1 " +
                        "WHERE r.module.id = :moduleId AND r.orderNumber >= :target AND r.orderNumber < :current")
        void shiftOrderUp(Integer moduleId, Integer target, Integer current);

        @Modifying(clearAutomatically = true)
        @Query("UPDATE Resource r SET r.orderNumber = r.orderNumber - 1 " +
                        "WHERE r.module.id = :moduleId AND r.orderNumber <= :target AND r.orderNumber > :current")
        void shiftOrderDown(Integer moduleId, Integer target, Integer current);

        @Modifying(clearAutomatically = true)
        @Query("UPDATE Resource r SET r.orderNumber = :target WHERE r.id = :id")
        void updateOrderNumber(Integer id, Integer target);

        @Query("SELECT COALESCE(MAX(r.orderNumber), 0) FROM Resource r WHERE r.module.id = :moduleId")
        Integer getLastOrderNumber(Integer moduleId);
}
