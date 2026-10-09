package com.lerneon.backend.services;

import java.util.List;

import com.lerneon.backend.models.entity.Course;
import com.lerneon.backend.models.payload.request.CourseRequest;
import com.lerneon.backend.models.payload.request.UpdateCourseVisibilityRequest;
import com.lerneon.backend.models.payload.response.CourseDetailResponse;
import com.lerneon.backend.models.payload.response.CourseResponse;

public interface CourseService {
    List<CourseResponse> getAllCourses();

    CourseDetailResponse getCourseBySlug(String slug);

    Course createCourse(CourseRequest courseRequest);

    Course updateCourse(Integer id, CourseRequest courseRequest);

    Course updateCourseVisibility(Integer id, UpdateCourseVisibilityRequest updateCourseVisibilityRequest);

    Course deleteCourse(Integer id);
}
