package com.lerneon.backend.models.entity;

import org.jdbi.v3.core.mapper.PropagateNull;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "images")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Image extends BaseEntity {
    @PropagateNull
    @Column(nullable = false)
    private String fileName;
    @PropagateNull
    @Column(nullable = false)
    private String path;
}
