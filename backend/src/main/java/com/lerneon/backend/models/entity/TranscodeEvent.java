package com.lerneon.backend.models.entity;

import java.time.LocalDateTime;

import com.lerneon.backend.models.enums.TranscodeStatus;
import com.lerneon.backend.models.enums.VideoResolution;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "video_transcoder_job")
public class TranscodeEvent extends BaseEntity {
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
