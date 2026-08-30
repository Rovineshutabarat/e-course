package com.lerneon.backend.models.event;

import com.lerneon.backend.models.enums.TranscodeStatus;
import com.lerneon.backend.models.enums.VideoResolution;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TranscodeEvent {
    private String source;
    private String destination;
    private VideoResolution videoResolution;
    private TranscodeStatus transcodeStatus;
    private Integer resourceId;
    private Integer transcodeLogId;
}
