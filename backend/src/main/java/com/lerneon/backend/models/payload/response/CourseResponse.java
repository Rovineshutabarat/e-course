package com.lerneon.backend.models.payload.response;

import java.math.BigDecimal;

import org.jdbi.v3.core.mapper.Nested;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

import com.lerneon.backend.models.entity.Image;
import com.lerneon.backend.models.enums.Difficulty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseResponse {
    private Integer id;
    private String title;
    private String slug;
    private String description;
    private BigDecimal price;

    @ColumnName("category_name")
    private String category;

    @Nested("instructor")
    private UserResponse instructor;

    private Difficulty difficulty;

    @Nested("course_image")
    private Image image;
}