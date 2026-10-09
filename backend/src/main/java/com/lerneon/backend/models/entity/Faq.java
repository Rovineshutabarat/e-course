package com.lerneon.backend.models.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "fags")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Faq extends BaseEntity {

    @NotBlank(message = "Question cannot be blank.")
    @Size(min = 10, message = "Question must be at least 10 characters long.")
    @Size(max = 255, message = "Question must not be longer than 255 characters.")
    @Column(nullable = false, length = 255)
    private String question;

    @NotBlank(message = "Answer cannot be blank.")
    @Size(min = 10, message = "Answer must be at least 10 characters long.")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String answer;
}
