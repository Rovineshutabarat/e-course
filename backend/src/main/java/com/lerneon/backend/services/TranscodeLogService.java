package com.lerneon.backend.services;

import java.util.List;

import com.lerneon.backend.models.entity.TranscodeLog;
import com.lerneon.backend.models.enums.TranscodeStatus;

public interface TranscodeLogService {

    TranscodeLog findTranscodeLogById(Integer id);

    List<TranscodeLog> findAllTranscodeLogByResource(Integer resourceId);

    TranscodeLog createTranscodeLog(TranscodeLog transcodeLog);

    TranscodeLog updateStatus(Integer id, TranscodeStatus transcodeStatus);

    Boolean checkTranscodeLogStatus(Integer id);

}
