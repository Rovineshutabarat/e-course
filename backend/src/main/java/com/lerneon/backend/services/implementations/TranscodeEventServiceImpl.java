package com.lerneon.backend.services.implementations;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.lerneon.backend.models.entity.TranscodeEvent;
import com.lerneon.backend.models.enums.TranscodeStatus;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.repositories.TranscodeEventRepository;
import com.lerneon.backend.services.TranscodeEventService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TranscodeEventServiceImpl implements TranscodeEventService {
    private final TranscodeEventRepository transcodeEventRepository;

    @Override
    public TranscodeEvent findTranscodeEventById(Integer id) {
        return transcodeEventRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Transcode Event was not found"));
    }

    @Override
    public List<TranscodeEvent> findAllTranscodeEventByResource(Integer resourceId) {
        return transcodeEventRepository.findAllByResource(resourceId);
    }

    @Override
    public TranscodeEvent createTranscodeEvent(TranscodeEvent transcodeEvent,
            TranscodeStatus transcodeStatus) {
        return transcodeEventRepository.save(TranscodeEvent.builder()
                .source(transcodeEvent.getSource())
                .destination(transcodeEvent.getDestination())
                .videoResolution(transcodeEvent.getVideoResolution())
                .transcodeStatus(transcodeStatus)
                .resource(transcodeEvent.getResource())
                .build());
    }

    @Override
    public TranscodeEvent updateStatus(Integer id, TranscodeStatus transcodeStatus) {
        TranscodeEvent transcodeEvent = findTranscodeEventById(id);

        transcodeEvent.setTranscodeStatus(transcodeStatus);

        if (transcodeStatus.equals(TranscodeStatus.COMPLETE)) {
            transcodeEvent.setFinishedAt(LocalDateTime.now());
        }

        return transcodeEventRepository.save(transcodeEvent);
    }

    @Override
    public Boolean checkTranscodeEventStatus(Integer id) {
        List<TranscodeEvent> transcodeEvents = this.findAllTranscodeEventByResource(id);
        return transcodeEvents.stream().map(TranscodeEvent::getTranscodeStatus).allMatch(
                status -> status.equals(TranscodeStatus.COMPLETE));
    }
}
