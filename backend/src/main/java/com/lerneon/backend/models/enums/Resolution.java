package com.lerneon.backend.models.enums;

public enum Resolution {
    RESOLUTION_360(20), RESOLUTION_480(40), RESOLUTION_720(60);

    private final int timeout;

    Resolution(int timeout) {
        this.timeout = timeout;
    }

    public int getTimeout() {
        return timeout;
    }
}
