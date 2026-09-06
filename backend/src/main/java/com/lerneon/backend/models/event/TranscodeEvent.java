package com.lerneon.backend.models.event;

import com.lerneon.backend.models.enums.VideoResolution;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class TranscodeEvent {
    private String source;
    private String destination;
    private VideoResolution videoResolution;
    private Integer resourceId;
    private Integer transcodeLogId;
    private Integer retryCount;
}
