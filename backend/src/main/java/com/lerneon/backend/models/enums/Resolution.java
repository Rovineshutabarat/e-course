package com.lerneon.backend.models.enums;

public enum Resolution {
    RES_360(20), RES_480(40), RES_720(60);

    private final int timeout;

    Resolution(int timeout) {
        this.timeout = timeout;
    }

    public int getTimeout() {
        return timeout;
    }
}
