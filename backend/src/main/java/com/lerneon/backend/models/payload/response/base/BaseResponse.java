package com.lerneon.backend.models.payload.response.base;

import java.util.Objects;

import com.lerneon.backend.models.enums.ResponseStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
public abstract class BaseResponse {
    private ResponseStatus status;
    private Integer code;
    private String message;

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof BaseResponse that))
            return false;
        return Objects.equals(status, that.status)
                && Objects.equals(code, that.code)
                && Objects.equals(message, that.message);
    }

    @Override
    public int hashCode() {
        return Objects.hash(status, code, message);
    }
}