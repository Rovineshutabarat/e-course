package com.lerneon.backend.models.entity;

import java.math.BigDecimal;
import java.util.List;
import com.lerneon.backend.models.enums.Difficulty;
import com.lerneon.backend.models.enums.Visibility;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "courses")
public class Course extends BaseEntity {

        @Column(nullable = false, length = 150)
        private String title;

        @Column(nullable = false, unique = true, length = 120)
        private String slug;

        @Column(nullable = false, columnDefinition = "TEXT")
        private String description;

        @Column(nullable = false, precision = 10, scale = 2)
        private BigDecimal price;

        @OneToOne
        @JoinColumn(name = "category_id", referencedColumnName = "id", nullable = false)
        private Category category;

        @OneToOne
        @JoinColumn(name = "instructor_id", referencedColumnName = "id", nullable = false)
        private User instructor;

        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private Difficulty difficulty;

        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private Visibility visibility;

        @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
        @JoinTable(name = "course_requirements", joinColumns = @JoinColumn(name = "course_id"),
                        inverseJoinColumns = @JoinColumn(name = "requirement_id"))
        private List<Requirement> requirements;

        @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
        @JoinTable(name = "course_outcomes", joinColumns = @JoinColumn(name = "course_id"),
                        inverseJoinColumns = @JoinColumn(name = "outcome_id"))
        private List<Outcome> outcomes;

        @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
        @JoinTable(name = "course_faqs", joinColumns = @JoinColumn(name = "course_id"),
                        inverseJoinColumns = @JoinColumn(name = "faq_id"))
        private List<Faq> faqs;

        @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
        @JoinColumn(name = "image_id", referencedColumnName = "id", nullable = false)
        private Image image;

        @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
        @JoinColumn(name = "walpaper_id", referencedColumnName = "id", nullable = false)
        private Image wallpaper;
}
