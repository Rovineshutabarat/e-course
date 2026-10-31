package com.lerneon.backend.models.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.lerneon.backend.models.enums.TranscodeStatus;
import com.lerneon.backend.models.enums.VideoResolution;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "transcode_log")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class TranscodeLog extends BaseEntity {
    private String source;
    private String destination;

    @Enumerated(EnumType.STRING)
    private VideoResolution videoResolution;

    @Enumerated(EnumType.STRING)
    private TranscodeStatus transcodeStatus;

    private LocalDateTime finishedAt;

    @ManyToOne
    @JoinColumn(name = "resource_id", referencedColumnName = "id", nullable = false)
    private Resource resource;
}
