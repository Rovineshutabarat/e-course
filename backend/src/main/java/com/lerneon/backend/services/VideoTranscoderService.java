package com.lerneon.backend.services;

import com.lerneon.backend.jobs.payload.VideoTranscoderPayload;

public interface VideoTranscoderService {
    String transcode(VideoTranscoderPayload videoTranscoderPayload, String[] commands);

    String transcode360p(VideoTranscoderPayload videoTranscoderPayload);

    String transcode480p(VideoTranscoderPayload videoTranscoderPayload);

    String transcode720p(VideoTranscoderPayload videoTranscoderPayload);

    String createMasterPlaylist(String outputDir);

    void createStreamDirectory(String path);
}
