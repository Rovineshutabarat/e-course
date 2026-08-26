package com.lerneon.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.lerneon.backend.models.entity.TranscodeEvent;

@Repository
public interface TranscodeEventRepository extends JpaRepository<TranscodeEvent, Integer> {
    @Query("SELECT t from TranscodeEvent t WHERE t.resource.id = :resourceId")
    List<TranscodeEvent> findAllByResource(Integer resourceId);
}
