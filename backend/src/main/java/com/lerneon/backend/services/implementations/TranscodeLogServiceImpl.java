package com.lerneon.backend.services.implementations;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.lerneon.backend.models.entity.Resource;
import com.lerneon.backend.models.entity.TranscodeLog;
import com.lerneon.backend.models.enums.TranscodeStatus;
import com.lerneon.backend.models.event.TranscodeEvent;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.repositories.TranscodeLogRepository;
import com.lerneon.backend.services.ResourceService;
import com.lerneon.backend.services.TranscodeLogService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TranscodeLogServiceImpl implements TranscodeLogService {
    private final TranscodeLogRepository transcodeLogRepository;
    private final ResourceService resourceService;

    @Override
    public TranscodeLog getTranscodeLogById(Integer id) {
        return transcodeLogRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Transcode Log was not found"));
    }

    @Override
    public TranscodeLog createTranscodeLog(TranscodeLog transcodeLog) {
        return transcodeLogRepository.save(transcodeLog);
    }

    @Override
    public TranscodeLog initTranscodeLog(TranscodeEvent transcodeEvent) {
        Resource resource = resourceService.getResourceById(transcodeEvent.getResourceId());

        TranscodeLog transcodeLog = TranscodeLog.builder()
                .source(transcodeEvent.getSource())
                .destination(transcodeEvent.getDestination())
                .videoResolution(transcodeEvent.getVideoResolution())
                .transcodeStatus(TranscodeStatus.PROCESSING)
                .resource(resource)
                .build();

        return createTranscodeLog(transcodeLog);
    }

    @Override
    public TranscodeLog updateStatus(Integer id, TranscodeStatus transcodeStatus) {
        TranscodeLog TranscodeLog = getTranscodeLogById(id);

        TranscodeLog.setTranscodeStatus(transcodeStatus);

        if (transcodeStatus.equals(TranscodeStatus.COMPLETE)) {
            TranscodeLog.setFinishedAt(LocalDateTime.now());
        }

        return transcodeLogRepository.save(TranscodeLog);
    }

    @Override
    public Boolean isAllTranscodeCompleted(Integer id) {
        return transcodeLogRepository.isAllTranscodeCompleted(id);
    }
}
