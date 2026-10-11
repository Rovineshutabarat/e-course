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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lerneon.backend.controllers.CourseController;
import com.lerneon.backend.handlers.ResponseHandler;
import com.lerneon.backend.models.entity.Course;
import com.lerneon.backend.models.payload.request.CourseFilterRequest;
import com.lerneon.backend.models.payload.request.CourseRequest;
import com.lerneon.backend.models.payload.request.UpdateCourseVisibilityRequest;
import com.lerneon.backend.models.payload.response.CourseDetailResponse;
import com.lerneon.backend.models.payload.response.CourseResponse;
import com.lerneon.backend.models.payload.response.ModuleResponse;
import com.lerneon.backend.models.payload.response.common.PageResponse;
import com.lerneon.backend.models.payload.response.common.SuccessResponse;
import com.lerneon.backend.services.CourseService;
import com.lerneon.backend.services.ModuleService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/course")
@RequiredArgsConstructor
public class CourseControllerImpl implements CourseController {
        private final CourseService courseService;
        private final ModuleService moduleService;

        @GetMapping
        @Override
        public ResponseEntity<SuccessResponse<PageResponse<CourseResponse>>> getAllCourses(
                        @ModelAttribute @Valid CourseFilterRequest courseFilterRequest) {
                return ResponseHandler.buildSuccessResponse(
                                HttpStatus.OK,
                                "Success fetching all courses",
                                courseService.getAllCourses(courseFilterRequest));
        }

        @GetMapping("/{slug}")
        @Override
        public ResponseEntity<SuccessResponse<CourseDetailResponse>> getCourseBySlug(@PathVariable String slug) {
                return ResponseHandler.buildSuccessResponse(
                                HttpStatus.OK,
                                "Success fetching course by slug",
                                courseService.getCourseBySlug(slug));
        }

        @GetMapping("/{slug}/modules")
        @Override
        public ResponseEntity<SuccessResponse<List<ModuleResponse>>> getAllModuleBySlug(@PathVariable String slug) {
                return ResponseHandler.buildSuccessResponse(
                                HttpStatus.OK,
                                "Success fetching all course modules",
                                moduleService.getAllModuleByCourseSlug(slug));
        }

        @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        @Override
        public ResponseEntity<SuccessResponse<Course>> createCourse(
                        @ModelAttribute @Valid CourseRequest courseRequest) {
                return ResponseHandler.buildSuccessResponse(
                                HttpStatus.CREATED,
                                "Success creating course",
                                courseService.createCourse(courseRequest));
        }

        @PutMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        @Override
        public ResponseEntity<SuccessResponse<Course>> updateCourse(@PathVariable Integer id,
                        @ModelAttribute @Valid CourseRequest courseRequest) {
                return ResponseHandler.buildSuccessResponse(
                                HttpStatus.OK,
                                "Success updating course",
                                courseService.updateCourse(id, courseRequest));
        }

        @PutMapping("/{id}/update-visibility")
        @Override
        public ResponseEntity<SuccessResponse<Course>> updateCourseVisibility(
                        @PathVariable Integer id,
                        @RequestBody @Valid UpdateCourseVisibilityRequest updateCourseVisibilityRequest) {
                return ResponseHandler.buildSuccessResponse(HttpStatus.OK,
                                "Success updating course visibility",
                                courseService.updateCourseVisibility(id, updateCourseVisibilityRequest));
        }

        @DeleteMapping("/{id}")
        @Override
        public ResponseEntity<SuccessResponse<Course>> deleteCourse(@PathVariable Integer id) {
                return ResponseHandler.buildSuccessResponse(
                                HttpStatus.OK,
                                "Success deleting course",
                                courseService.deleteCourse(id));
        }
}
