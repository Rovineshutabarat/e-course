package com.lerneon.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.lerneon.backend.models.entity.TranscodeLog;

@Repository
public interface TranscodeLogRepository extends JpaRepository<TranscodeLog, Integer> {
    @Query("SELECT t from TranscodeLog t WHERE t.resource.id = :resourceId")
    List<TranscodeLog> findAllByResource(Integer resourceId);
}
