package com.lerneon.backend.services;

import com.lerneon.backend.models.enums.TranscodeStatus;
import com.lerneon.backend.models.event.TranscodeEvent;

public interface TranscodeService {

    TranscodeStatus transcode(TranscodeEvent transcodeEvent);

    String createMasterPlaylist(TranscodeEvent transcodeEvent);

}
