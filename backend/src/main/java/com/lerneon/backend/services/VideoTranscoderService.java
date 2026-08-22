package com.lerneon.backend.services;


public interface VideoTranscoderService {

    // void transcode360p(VideoTranscoderPayload payload);

    // void transcode480p(VideoTranscoderPayload payload);

    // void transcode720p(VideoTranscoderPayload payload);

    String createMasterPlaylist(String outputDir, String content);
}
