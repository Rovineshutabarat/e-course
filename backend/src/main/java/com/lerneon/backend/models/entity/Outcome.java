package com.lerneon.backend.models.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
@Table(name = "outcomes")
public class Outcome extends BaseEntity {
    @NotBlank(message = "Outcome name cannot be blank.")
    @Size(min = 5, message = "Outcome name must be at least 5 characters long.")
    @Size(max = 150, message = "Outcome name must not be longer than 150 characters.")
    @Column(nullable = false, length = 150)
    private String name;
}
