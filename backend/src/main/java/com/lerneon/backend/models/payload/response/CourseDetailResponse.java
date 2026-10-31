package com.lerneon.backend.models.payload.response;

import java.math.BigDecimal;
import java.util.List;

import org.jdbi.v3.core.mapper.Nested;
import org.jdbi.v3.core.mapper.reflect.ColumnName;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.lerneon.backend.models.entity.Faq;
import com.lerneon.backend.models.entity.Image;
import com.lerneon.backend.models.entity.Outcome;
import com.lerneon.backend.models.entity.Requirement;
import com.lerneon.backend.models.enums.Difficulty;
import com.lerneon.backend.models.enums.Visibility;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class CourseDetailResponse {
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
    private Visibility visibility;
    private List<Requirement> requirements;
    private List<Outcome> outcomes;
    private List<Faq> faqs;
    @Nested("course_image")
    private Image image;
}
