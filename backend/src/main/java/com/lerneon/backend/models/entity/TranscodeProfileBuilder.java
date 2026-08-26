
package com.lerneon.backend.models.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TranscodeProfileBuilder {
    private String scale;
    private String pad;
    private String preset;
    private String tune;
    private String crf;
    private String maxrate;
    private String bufsize;
    private String profile;
    private String audioBitRate;
}