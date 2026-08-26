package com.lerneon.backend.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.lerneon.backend.models.entity.Course;
import com.lerneon.backend.models.entity.Module;
import com.lerneon.backend.models.payload.request.CourseRequest;
import com.lerneon.backend.models.payload.request.UpdateCourseVisibilityRequest;
import com.lerneon.backend.models.payload.response.common.SuccessResponse;

public interface CourseController {
    ResponseEntity<SuccessResponse<List<Course>>> findAllCourses();

    ResponseEntity<SuccessResponse<Course>> findCourseBySlug(String slug);

    ResponseEntity<SuccessResponse<List<Module>>> findAllModules(String slug);

    ResponseEntity<SuccessResponse<Course>> createCourse(CourseRequest courseRequest);

    ResponseEntity<SuccessResponse<Course>> updateCourse(Integer id, CourseRequest courseRequest);

    ResponseEntity<SuccessResponse<Course>> updateCourseVisibility(
            Integer id,
            UpdateCourseVisibilityRequest updateCourseVisibilityRequest);

    ResponseEntity<SuccessResponse<Course>> deleteCourse(Integer id);
}
