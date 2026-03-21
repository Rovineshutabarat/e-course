package com.lerneon.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lerneon.backend.models.entity.Requirement;

@Repository
public interface RequirementRepository extends JpaRepository<Requirement, Integer> {

}
