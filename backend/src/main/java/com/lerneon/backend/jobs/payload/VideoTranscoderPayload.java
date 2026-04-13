package com.lerneon.backend.jobs.payload;

import java.io.Serializable;
import com.lerneon.backend.models.enums.Resolution;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VideoTranscoderPayload implements Serializable {
    private String source;
    private String outputDirectory;
    private Resolution resolution;
}
