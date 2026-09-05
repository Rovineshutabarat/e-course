package com.lerneon.backend.services;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.lerneon.backend.models.enums.TranscodeStatus;
import com.lerneon.backend.models.event.TranscodeEvent;

public interface TranscodeService {

    TranscodeStatus transcode(TranscodeEvent transcodeEvent);

    String createMasterPlaylist(TranscodeEvent transcodeEvent);

    String getDestination(TranscodeEvent transcodeEvent);

    void failEmitter(Integer transcodeLogId);

    void registerEmitter(Integer transcodeLogId, SseEmitter emitter);

}
