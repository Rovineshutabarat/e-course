package com.lerneon.backend.controllers.implementations;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lerneon.backend.controllers.CourseController;
import com.lerneon.backend.handlers.ResponseHandler;
import com.lerneon.backend.models.entity.Course;
import com.lerneon.backend.models.payload.request.CourseRequest;
import com.lerneon.backend.models.payload.response.common.SuccessResponse;
import com.lerneon.backend.services.CourseService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/course")
@AllArgsConstructor
public class CourseControllerImpl implements CourseController {
    private final CourseService courseService;

    @GetMapping
    @Override
    public ResponseEntity<SuccessResponse<List<Course>>> findAllCourses() {
        return ResponseHandler.buildSuccessResponse(HttpStatus.OK, "Success get all courses",
                courseService.findAllCourses());
    }

    // @GetMapping("/{id}")
    // @Override
    // public ResponseEntity<SuccessResponse<Course>> findCourseById(@PathVariable Integer id) {
    // return ResponseHandler.buildSuccessResponse(HttpStatus.OK, "Success get course by id",
    // courseService.findCourseById(id));
    // }

    @GetMapping("/{slug}")
    @Override
    public ResponseEntity<SuccessResponse<Course>> findCourseBySlug(@PathVariable String slug) {
        return ResponseHandler.buildSuccessResponse(HttpStatus.OK, "Success get course by slug",
                courseService.findCourseBySlug(slug));
    }


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Override
    public ResponseEntity<SuccessResponse<Course>> createCourse(
            @ModelAttribute @Valid CourseRequest courseRequest) {
        return ResponseHandler.buildSuccessResponse(HttpStatus.OK, "Success creating course",
                courseService.createCourse(courseRequest));
    }

    @PutMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Override
    public ResponseEntity<SuccessResponse<Course>> updateCourse(@PathVariable Integer id,
            @ModelAttribute @Valid CourseRequest courseRequest) {
        return ResponseHandler.buildSuccessResponse(HttpStatus.OK, "Success updating course",
                courseService.updateCourse(id, courseRequest));
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<SuccessResponse<Course>> deleteCourse(@PathVariable Integer id) {
        return ResponseHandler.buildSuccessResponse(HttpStatus.OK, "Success deleting course",
                courseService.deleteCourse(id));
    }
}
