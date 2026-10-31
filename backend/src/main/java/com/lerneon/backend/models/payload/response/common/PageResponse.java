package com.lerneon.backend.models.payload.response.common;

import java.util.List;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class PageResponse<T> {
    private List<T> items;
    private Integer page;
    private Integer size;
    private Boolean hasPrevious;
    private Boolean hasNext;

    public static <T> PageResponse<T> of(List<T> items, int page, int size) {
        boolean hasNext = items.size() > size;
        boolean hasPrevious = page > 0;

        return new PageResponse<>(
                hasNext ? items.subList(0, size) : items,
                page,
                size,
                hasPrevious,
                hasNext);
    }
}