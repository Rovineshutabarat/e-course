package com.lerneon.backend.services.implementations;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.lerneon.backend.models.entity.Course;
import com.lerneon.backend.models.enums.Difficulty;
import com.lerneon.backend.models.enums.Visibility;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.models.payload.request.CourseRequest;
import com.lerneon.backend.models.payload.request.UpdateCourseVisibilityRequest;
import com.lerneon.backend.models.payload.response.CourseDetailResponse;
import com.lerneon.backend.models.payload.response.CourseResponse;
import com.lerneon.backend.repositories.CourseRepository;
import com.lerneon.backend.repositories.FaqRepository;
import com.lerneon.backend.repositories.OutcomeRepository;
import com.lerneon.backend.repositories.RequirementRepository;
import com.lerneon.backend.repositories.jdbi.CourseJDBIRepository;
import com.lerneon.backend.services.CategoryService;
import com.lerneon.backend.services.CourseService;
import com.lerneon.backend.services.UploadImageService;
import com.lerneon.backend.services.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourseServiceImpl implements CourseService {
    private final CourseRepository courseRepository;
    private final RequirementRepository requirementRepository;
    private final OutcomeRepository outcomeRepository;
    private final FaqRepository faqRepository;
    private final CategoryService categoryService;
    private final UserService userService;
    private final UploadImageService uploadImageService;
    private final CourseJDBIRepository courseJDBIRepository;

    @Override
    public List<CourseResponse> getAllCourses() {
        return courseJDBIRepository.getAllCourses();
    }

    private Course findCourseById(Integer id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course was not found"));
    }

    @Override
    public CourseDetailResponse getCourseBySlug(String slug) {
        return courseJDBIRepository.getCourseBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Course was not found"));
    }

    @Override
    public Course createCourse(CourseRequest courseRequest) {
        log.info("{}", courseRequest);
        log.info("{}", userService.getCurrentAuthenticatedUser());
        return courseRepository.save(Course.builder()
                .title(courseRequest.getTitle())
                .slug(generateSlug(courseRequest.getTitle()))
                .description(courseRequest.getDescription()).price(courseRequest.getPrice())
                .category(categoryService.getCategoryById(courseRequest.getCategoryId()))
                .instructor(userService.getCurrentAuthenticatedUser())
                .difficulty(Difficulty.valueOf(courseRequest.getDifficulty()))
                .visibility(Visibility.valueOf(courseRequest.getVisibility()))
                .requirements(courseRequest.getRequirements())
                .outcomes(courseRequest.getOutcomes())
                .faqs(courseRequest.getFaqs())
                .image(uploadImageService.uploadImage(courseRequest.getImage()))
                .banner(uploadImageService.uploadImage(courseRequest.getBanner()))
                .build());

    }

    @Override
    public Course updateCourse(Integer id, CourseRequest courseRequest) {
        findCourseById(id);
        return courseRepository.save(Course.builder()
                .id(id)
                .title(courseRequest.getTitle())
                .description(courseRequest.getDescription()).price(courseRequest.getPrice())
                .category(categoryService.getCategoryById(courseRequest.getCategoryId()))
                .instructor(userService.getCurrentAuthenticatedUser())
                .difficulty(Difficulty.valueOf(courseRequest.getDifficulty()))
                .visibility(Visibility.valueOf(courseRequest.getVisibility()))
                .requirements(saveIfPresent(courseRequest.getRequirements(), requirementRepository))
                .outcomes(saveIfPresent(courseRequest.getOutcomes(), outcomeRepository))
                .faqs(saveIfPresent(courseRequest.getFaqs(), faqRepository))
                .image(uploadImageService.uploadImage(courseRequest.getImage()))
                .banner(uploadImageService.uploadImage(courseRequest.getBanner())).build());
    }

    @Override
    public Course updateCourseVisibility(Integer id,
            UpdateCourseVisibilityRequest updateCourseVisibilityRequest) {
        Course course = findCourseById(id);
        course.setVisibility(Visibility.valueOf(updateCourseVisibilityRequest.getVisibility()));
        return courseRepository.save(course);
    }

    @Override
    public Course deleteCourse(Integer id) {
        Course course = findCourseById(id);
        courseRepository.delete(course);
        ;
        return course;
    }

    private <T> List<T> saveIfPresent(List<T> items, JpaRepository<T, ?> repository) {
        if (items == null || items.isEmpty())
            return List.of();
        return items.stream().map(repository::save).toList();
    }

    private String generateSlug(String title) {
        return title.toLowerCase().replace(" ", "-");
    }

}
