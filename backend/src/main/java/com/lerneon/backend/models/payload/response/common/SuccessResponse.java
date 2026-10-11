package com.lerneon.backend.models.payload.response.common;

import com.lerneon.backend.models.payload.response.base.BaseResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
public class SuccessResponse<T> extends BaseResponse {
    private T data;
}
