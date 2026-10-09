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
@Table(name = "outcomes")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Outcome extends BaseEntity {
    @NotBlank(message = "Outcome name cannot be blank.")
    @Size(min = 5, message = "Outcome name must be at least 5 characters long.")
    @Size(max = 150, message = "Outcome name must not be longer than 150 characters.")
    @Column(nullable = false, length = 150)
    private String name;
}
