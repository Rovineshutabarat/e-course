package com.lerneon.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.lerneon.backend.models.entity.Resource;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Integer> {
    @Query("SELECT COALESCE(MAX(r.orderNumber), 0) FROM Resource r WHERE r.module.id = :moduleId")
    Integer getLastOrderNumber(Integer moduleId);
}
