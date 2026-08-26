package com.lerneon.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lerneon.backend.models.entity.Faq;

@Repository
public interface FaqRepository extends JpaRepository<Faq, Integer> {

}
