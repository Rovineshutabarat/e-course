package com.lerneon.backend.services;

import com.lerneon.backend.models.entity.TranscodeLog;
import com.lerneon.backend.models.enums.TranscodeStatus;
import com.lerneon.backend.models.event.TranscodeEvent;

public interface TranscodeLogService {

    TranscodeLog getTranscodeLogById(Integer id);

    TranscodeLog createTranscodeLog(TranscodeLog transcodeLog);

    TranscodeLog updateStatus(Integer id, TranscodeStatus transcodeStatus);

    Boolean isAllTranscodeCompleted(Integer id);

    TranscodeLog initTranscodeLog(TranscodeEvent transcodeEvent);

}
