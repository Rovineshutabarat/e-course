package com.lerneon.backend.models.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.lerneon.backend.models.enums.Difficulty;
import com.lerneon.backend.models.enums.Visibility;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
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

        @ManyToOne(fetch = FetchType.LAZY, optional = false)
        @JoinColumn(name = "category_id", referencedColumnName = "id", nullable = false)
        private Category category;

        @ManyToOne(fetch = FetchType.LAZY, optional = false)
        @JoinColumn(name = "instructor_id", referencedColumnName = "id", nullable = false)
        private User instructor;

        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private Difficulty difficulty;

        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private Visibility visibility;

        @Builder.Default
        @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
        @JoinColumn(name = "course_id", referencedColumnName = "id", nullable = false)
        private List<Requirement> requirements = new ArrayList<>();

        @Builder.Default
        @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
        @JoinColumn(name = "course_id", referencedColumnName = "id", nullable = false)
        private List<Outcome> outcomes = new ArrayList<>();

        @Builder.Default
        @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
        @JoinColumn(name = "course_id", referencedColumnName = "id", nullable = false)
        private List<Faq> faqs = new ArrayList<>();

        @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
        @JoinColumn(name = "image_id", referencedColumnName = "id", nullable = false, unique = true)
        private Image image;

        @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
        @JoinColumn(name = "banner_id", referencedColumnName = "id", nullable = false, unique = true)
        private Image banner;
}