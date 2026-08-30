package com.lerneon.backend.services.implementations;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.lerneon.backend.models.entity.TranscodeLog;
import com.lerneon.backend.models.enums.TranscodeStatus;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.repositories.TranscodeLogRepository;
import com.lerneon.backend.services.TranscodeLogService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TranscodeLogServiceImpl implements TranscodeLogService {
    private final TranscodeLogRepository TranscodeLogRepository;

    @Override
    public TranscodeLog findTranscodeLogById(Integer id) {
        return TranscodeLogRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Transcode Log was not found"));
    }

    @Override
    public List<TranscodeLog> findAllTranscodeLogByResource(Integer resourceId) {
        return TranscodeLogRepository.findAllByResource(resourceId);
    }

    @Override
    public TranscodeLog createTranscodeLog(TranscodeLog transcodeLog) {
        return TranscodeLogRepository.save(transcodeLog);
    }

    @Override
    public TranscodeLog updateStatus(Integer id, TranscodeStatus transcodeStatus) {
        TranscodeLog TranscodeLog = findTranscodeLogById(id);

        TranscodeLog.setTranscodeStatus(transcodeStatus);

        if (transcodeStatus.equals(TranscodeStatus.COMPLETE)) {
            TranscodeLog.setFinishedAt(LocalDateTime.now());
        }

        return TranscodeLogRepository.save(TranscodeLog);
    }

    @Override
    public Boolean checkTranscodeLogStatus(Integer id) {
        return findAllTranscodeLogByResource(id).stream()
                .allMatch(l -> l.getTranscodeStatus().equals(TranscodeStatus.COMPLETE));
    }
}
