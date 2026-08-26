package com.lerneon.backend.services;

import java.util.List;

import com.lerneon.backend.models.entity.TranscodeEvent;
import com.lerneon.backend.models.enums.TranscodeStatus;

public interface TranscodeEventService {

    TranscodeEvent findTranscodeEventById(Integer id);

    List<TranscodeEvent> findAllTranscodeEventByResource(Integer resourceId);

    TranscodeEvent createTranscodeEvent(TranscodeEvent transcodeEvent, TranscodeStatus transcodeStatus);

    TranscodeEvent updateStatus(Integer id, TranscodeStatus transcodeStatus);

    Boolean checkTranscodeEventStatus(Integer id);

}
