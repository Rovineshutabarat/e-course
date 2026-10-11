package com.lerneon.backend.models.payload.response.common;

import java.time.LocalDateTime;

import com.lerneon.backend.models.payload.response.base.BaseResponse;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
public class ErrorResponse extends BaseResponse {
    private String path;
    private LocalDateTime timestamp;
}
