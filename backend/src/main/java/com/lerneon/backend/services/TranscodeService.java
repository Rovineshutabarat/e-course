package com.lerneon.backend.services;

import com.lerneon.backend.models.entity.TranscodeEvent;
import com.lerneon.backend.models.enums.TranscodeStatus;

public interface TranscodeService {

    TranscodeStatus transcode(TranscodeEvent transcodeEvent);

    String createMasterPlaylist(TranscodeEvent transcodeEvent);

}
