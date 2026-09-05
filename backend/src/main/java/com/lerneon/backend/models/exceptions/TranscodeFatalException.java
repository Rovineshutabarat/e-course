package com.lerneon.backend.models.exceptions;

public class TranscodeFatalException extends RuntimeException {
    public TranscodeFatalException(String message) {
        super(message);
    }
}
