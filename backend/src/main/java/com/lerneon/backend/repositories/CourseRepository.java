package com.lerneon.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lerneon.backend.models.entity.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {

}
