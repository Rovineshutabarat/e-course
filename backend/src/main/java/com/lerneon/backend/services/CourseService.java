package com.lerneon.backend.services;

import com.lerneon.backend.models.entity.Course;
import com.lerneon.backend.models.payload.request.CourseFilterRequest;
import com.lerneon.backend.models.payload.request.CourseRequest;
import com.lerneon.backend.models.payload.request.UpdateCourseVisibilityRequest;
import com.lerneon.backend.models.payload.response.CourseDetailResponse;
import com.lerneon.backend.models.payload.response.CourseResponse;
import com.lerneon.backend.models.payload.response.common.PageResponse;

public interface CourseService {
    PageResponse<CourseResponse> getAllCourses(CourseFilterRequest courseFilterRequest);

    CourseDetailResponse getCourseBySlug(String slug);

    Course createCourse(CourseRequest courseRequest);

    Course updateCourse(Integer id, CourseRequest courseRequest);

    Course updateCourseVisibility(Integer id, UpdateCourseVisibilityRequest updateCourseVisibilityRequest);

    Course deleteCourse(Integer id);
}
