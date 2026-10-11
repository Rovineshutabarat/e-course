package com.lerneon.backend.models.entity;

import java.time.LocalDateTime;
import java.util.Objects;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.proxy.HibernateProxy;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@MappedSuperclass
public abstract class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    @JsonIgnore
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @JsonIgnore
    private LocalDateTime updatedAt;

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null)
            return false;

        Class<?> thisClass = this instanceof HibernateProxy p
                ? p.getHibernateLazyInitializer().getPersistentClass()
                : this.getClass();
        Class<?> otherClass = o instanceof HibernateProxy p
                ? p.getHibernateLazyInitializer().getPersistentClass()
                : o.getClass();

        if (thisClass != otherClass)
            return false;

        BaseEntity that = (BaseEntity) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public int hashCode() {
        Class<?> effectiveClass = this instanceof HibernateProxy p
                ? p.getHibernateLazyInitializer().getPersistentClass()
                : this.getClass();
        return effectiveClass.hashCode();
    }
}