package com.lerneon.backend.models.exceptions;

public class TranscodeRetryableException extends RuntimeException {
    public TranscodeRetryableException(String message) {
        super(message);
    }
}
