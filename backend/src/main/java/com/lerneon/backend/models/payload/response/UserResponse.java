package com.lerneon.backend.models.payload.response;

import java.time.LocalDateTime;

import org.jdbi.v3.core.mapper.Nested;

import com.lerneon.backend.models.entity.Image;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private String username;
    private String email;
    private LocalDateTime verifiedAt;

    @Nested("image")
    private Image image;
}