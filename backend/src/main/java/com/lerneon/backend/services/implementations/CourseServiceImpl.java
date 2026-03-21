package com.lerneon.backend.services.implementations;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import com.lerneon.backend.models.entity.Course;
import com.lerneon.backend.models.enums.Difficulty;
import com.lerneon.backend.models.enums.Visibility;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.models.payload.request.CourseRequest;
import com.lerneon.backend.repositories.CourseRepository;
import com.lerneon.backend.repositories.FaqRepository;
import com.lerneon.backend.repositories.OutcomeRepository;
import com.lerneon.backend.repositories.RequirementRepository;
import com.lerneon.backend.services.CategoryService;
import com.lerneon.backend.services.CourseService;
import com.lerneon.backend.services.UploadImageService;
import com.lerneon.backend.services.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class CourseServiceImpl implements CourseService {
    private final CourseRepository courseRepository;
    private final RequirementRepository requirementRepository;
    private final OutcomeRepository outcomeRepository;
    private final FaqRepository faqRepository;
    private final CategoryService categoryService;
    private final UserService userService;
    private final UploadImageService uploadImageService;

    @Override
    public List<Course> findAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course findCourseById(Integer id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course was not found"));
    }

    @Override
    public Course createCourse(CourseRequest courseRequest) {

        log.info(courseRequest.toString());
        return courseRepository.save(Course.builder().title(courseRequest.getTitle())
                .description(courseRequest.getDescription()).price(courseRequest.getPrice())
                .category(categoryService.findCategoryById(courseRequest.getCategoryId()))
                .instructor(userService.getCurrentAuthenticatedUser())
                .difficulty(Difficulty.valueOf(courseRequest.getDifficulty()))
                .visibility(Visibility.valueOf(courseRequest.getVisibility()))
                .requirements(saveIfPresent(courseRequest.getRequirements(), requirementRepository))
                .outcomes(saveIfPresent(courseRequest.getOutcomes(), outcomeRepository))
                .faqs(saveIfPresent(courseRequest.getFaqs(), faqRepository))
                .image(uploadImageService.uploadImage(courseRequest.getImage()))
                .walpaper(uploadImageService.uploadImage(courseRequest.getWallpaper())).build());

    }

    @Override
    public Course updateCourse(Integer id, CourseRequest courseRequest) {
        findCourseById(id);
        return courseRepository.save(Course.builder().title(courseRequest.getTitle()).id(id)
                .description(courseRequest.getDescription()).price(courseRequest.getPrice())
                .category(categoryService.findCategoryById(courseRequest.getCategoryId()))
                .instructor(userService.getCurrentAuthenticatedUser())
                .difficulty(Difficulty.valueOf(courseRequest.getDifficulty()))
                .visibility(Visibility.valueOf(courseRequest.getVisibility()))
                .requirements(saveIfPresent(courseRequest.getRequirements(), requirementRepository))
                .outcomes(saveIfPresent(courseRequest.getOutcomes(), outcomeRepository))
                .faqs(saveIfPresent(courseRequest.getFaqs(), faqRepository))
                .image(uploadImageService.uploadImage(courseRequest.getImage()))
                .walpaper(uploadImageService.uploadImage(courseRequest.getWallpaper())).build());
    }

    @Override
    public Course deleteCourse(Integer id) {
        Course course = findCourseById(id);
        courseRepository.delete(course);;
        return course;
    }

    private <T> List<T> saveIfPresent(List<T> items, JpaRepository<T, ?> repository) {
        if (items == null || items.isEmpty())
            return List.of();
        return items.stream().map(repository::save).toList();
    }

}
