package com.lerneon.backend.services;

import java.util.List;
import com.lerneon.backend.models.entity.Course;
import com.lerneon.backend.models.payload.request.CourseRequest;

public interface CourseService {
    List<Course> findAllCourses();

    Course findCourseById(Integer id);

    Course findCourseBySlug(String slug);

    Course createCourse(CourseRequest courseRequest);

    Course updateCourse(Integer id, CourseRequest courseRequest);

    Course deleteCourse(Integer id);
}
