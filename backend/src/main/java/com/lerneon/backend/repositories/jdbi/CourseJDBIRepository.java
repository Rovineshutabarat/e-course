package com.lerneon.backend.repositories.jdbi;

import java.util.List;
import java.util.Optional;

import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.mapper.reflect.FieldMapper;
import org.springframework.stereotype.Repository;

import com.lerneon.backend.models.entity.Faq;
import com.lerneon.backend.models.entity.Outcome;
import com.lerneon.backend.models.entity.Requirement;
import com.lerneon.backend.models.payload.request.CourseFilterRequest;
import com.lerneon.backend.models.payload.response.CourseDetailResponse;
import com.lerneon.backend.models.payload.response.CourseResponse;
import com.lerneon.backend.models.payload.response.common.PageResponse;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class CourseJDBIRepository {
        private final Jdbi jdbi;

        public PageResponse<CourseResponse> getAllCourses(CourseFilterRequest courseFilterRequest) {
                List<CourseResponse> courseResponses = jdbi.withHandle(h -> h.createQuery("""
                                SELECT
                                    course.id,
                                    course.title,
                                    course.slug,
                                    course.description,
                                    course.price,
                                    course.difficulty,
                                    category.name AS category_name,
                                    instructor.username AS instructor_username,
                                    instructor.email AS instructor_email,
                                    instructor.verified_at AS instructor_verified_at,
                                    instructor_image.id AS instructor_image_id,
                                    instructor_image.file_name AS instructor_image_file_name,
                                    instructor_image.path AS instructor_image_path,
                                    course_image.id AS course_image_id,
                                    course_image.file_name AS course_image_file_name,
                                    course_image.path AS course_image_path
                                FROM courses course
                                JOIN categories category ON category.id = course.category_id
                                JOIN users instructor ON instructor.id = course.instructor_id
                                LEFT JOIN images instructor_image ON instructor_image.id = instructor.image_id
                                LEFT JOIN images course_image ON course_image.id = course.image_id
                                where course.visibility = 'PUBLIC'
                                    AND (:key IS NULL
                                        OR LOWER(course.slug) LIKE LOWER(CONCAT('%', :key, '%'))
                                        OR LOWER(course.title) LIKE LOWER(CONCAT('%', :key, '%'))
                                        OR LOWER(category.name) LIKE LOWER(CONCAT('%', :key, '%'))
                                        OR LOWER(instructor.username) LIKE LOWER(CONCAT('%', :key, '%')))
                                    AND (:categoryId IS NULL OR course.category_id = :categoryId)
                                    AND (:difficulty IS NULL OR course.difficulty = :difficulty)
                                    AND (:minPrice IS NULL OR course.price >= :minPrice)
                                    AND (:maxPrice IS NULL OR course.price <= :maxPrice)
                                ORDER BY course.id
                                LIMIT :limit
                                OFFSET :offset
                                """)
                                .bindBean(courseFilterRequest)
                                .bind("limit", courseFilterRequest.getSize() + 1)
                                .bind("offset", courseFilterRequest.getPage() * courseFilterRequest.getSize())
                                .map(FieldMapper.of(CourseResponse.class))
                                .list());
                return PageResponse.of(courseResponses, courseFilterRequest.getPage(), courseFilterRequest.getSize());
        }

        public Optional<CourseDetailResponse> getCourseBySlug(String slug) {
                return jdbi.withHandle(h -> {
                        Optional<CourseDetailResponse> found = h.createQuery("""
                                        SELECT
                                            course.id,
                                            course.title,
                                            course.slug,
                                            course.description,
                                            course.price,
                                            course.difficulty,
                                            course.visibility,
                                            category.name AS category_name,
                                            instructor.username AS instructor_username,
                                            instructor.email AS instructor_email,
                                            instructor.verified_at AS instructor_verified_at,
                                            instructor_image.id AS instructor_image_id,
                                            instructor_image.file_name AS instructor_image_file_name,
                                            instructor_image.path AS instructor_image_path,
                                            course_image.id AS course_image_id,
                                            course_image.file_name AS course_image_file_name,
                                            course_image.path AS course_image_path
                                        FROM courses course
                                        JOIN categories category ON category.id = course.category_id
                                        JOIN users instructor ON instructor.id = course.instructor_id
                                        LEFT JOIN images instructor_image ON instructor_image.id = instructor.image_id
                                        LEFT JOIN images course_image ON course_image.id = course.image_id
                                        WHERE course.slug = :slug
                                        """)
                                        .bind("slug", slug)
                                        .map(FieldMapper.of(CourseDetailResponse.class))
                                        .findOne();

                        found.ifPresent(course -> {
                                course.setRequirements(h.createQuery(
                                                "SELECT id, name FROM requirements WHERE course_id = :id ORDER BY id")
                                                .bind("id", course.getId())
                                                .map(FieldMapper.of(Requirement.class))
                                                .list());

                                course.setOutcomes(h.createQuery(
                                                "SELECT id, name FROM outcomes WHERE course_id = :id ORDER BY id")
                                                .bind("id", course.getId())
                                                .map(FieldMapper.of(Outcome.class))
                                                .list());

                                course.setFaqs(h.createQuery(
                                                "SELECT id, question, answer FROM fags WHERE course_id = :id ORDER BY id")
                                                .bind("id", course.getId())
                                                .map(FieldMapper.of(Faq.class))
                                                .list());
                        });

                        return found;
                });
        }

}