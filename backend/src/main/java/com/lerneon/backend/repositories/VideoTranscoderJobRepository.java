package com.lerneon.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lerneon.backend.models.entity.VideoTranscoderJob;

@Repository
public interface VideoTranscoderJobRepository extends JpaRepository<VideoTranscoderJob, Integer> {
}
