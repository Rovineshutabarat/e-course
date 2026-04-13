package com.lerneon.backend.models.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "modules")
public class Module extends BaseEntity {
    @Column(nullable = false, length = 50)
    private String title;

    @Column(name = "order_number", nullable = false)
    private Integer orderNumber;

    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "id", nullable = false)
    @JsonIgnore
    private Course course;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "module_id", referencedColumnName = "id")
    private List<Resource> resources;
}
