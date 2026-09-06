package com.lerneon.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.lerneon.backend.models.entity.TranscodeLog;

@Repository
public interface TranscodeLogRepository extends JpaRepository<TranscodeLog, Integer> {

    @Query("SELECT COUNT(t) = 3 FROM TranscodeLog t WHERE t.resource.id = :resourceId AND t.transcodeStatus = 'COMPLETE'")
    boolean isAllTranscodeCompleted(@Param("resourceId") Integer resourceId);
}
