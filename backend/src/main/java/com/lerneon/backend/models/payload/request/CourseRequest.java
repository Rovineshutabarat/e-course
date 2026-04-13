package com.lerneon.backend.models.payload.request;

import java.math.BigDecimal;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.lerneon.backend.models.annotations.ValidEnum;
import com.lerneon.backend.models.annotations.ValidImage;
import com.lerneon.backend.models.entity.Faq;
import com.lerneon.backend.models.entity.Outcome;
import com.lerneon.backend.models.entity.Requirement;
import com.lerneon.backend.models.enums.Difficulty;
import com.lerneon.backend.models.enums.Visibility;
import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseRequest {

        @NotBlank(message = "Course name cannot be blank.")
        @Size(min = 5, max = 150, message = "Course name must be between 5 and 150 characters.")
        private String title;

        @NotBlank(message = "Description cannot be blank.")
        @Size(min = 50, message = "Description must be at least 50 characters.")
        private String description;

        @NotNull(message = "Price is required.")
        @DecimalMin(value = "0.0", inclusive = true,
                        message = "Price must be greater than or equal to 0.")
        private BigDecimal price;

        @NotNull(message = "Category is required.")
        private Integer categoryId;

        @ValidEnum(enumClass = Difficulty.class,
                        message = "Course Difficulty must be one of: BEGINNER, INTERMEDIATE, ADVANCE")
        private String difficulty;

        @ValidEnum(enumClass = Visibility.class,
                        message = "Course Visibility must be one of: PRIVATE, PUBLIC, SUSPENDED")
        private String visibility;

        @Valid
        @NotEmpty(message = "Requirements cannot be empty.")
        private List<Requirement> requirements;

        @Valid
        @NotEmpty(message = "Outcomes cannot be empty.")
        private List<Outcome> outcomes;

        @Valid
        @NotEmpty(message = "Faqs cannot be empty.")
        private List<Faq> faqs;

        @ValidImage
        private MultipartFile image;

        @ValidImage
        private MultipartFile wallpaper;
}
