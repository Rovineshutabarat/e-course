package com.lerneon.backend.handlers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.lerneon.backend.models.exceptions.AuthException;
import com.lerneon.backend.models.exceptions.BadRequestException;
import com.lerneon.backend.models.exceptions.DuplicateElementException;
import com.lerneon.backend.models.exceptions.ForbiddenException;
import com.lerneon.backend.models.exceptions.MailDeliveryException;
import com.lerneon.backend.models.exceptions.RateLimitException;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.models.exceptions.TranscodeException;
import com.lerneon.backend.models.exceptions.TranscodeFatalException;
import com.lerneon.backend.models.exceptions.TranscodeRetryableException;
import com.lerneon.backend.models.exceptions.UploadException;
import com.lerneon.backend.models.payload.response.common.ErrorResponse;
import com.lerneon.backend.models.payload.response.common.ValidationErrorResponse;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalExceptionHandler {
        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ValidationErrorResponse> handleMethodArgumentNotValidException(
                        MethodArgumentNotValidException exception,
                        HttpServletRequest request) {
                return ResponseHandler.buildValidationErrorResponse(
                                HttpStatus.BAD_REQUEST,
                                request,
                                exception);
        }

        @ExceptionHandler(ResourceNotFoundException.class)
        public ResponseEntity<ErrorResponse> handleResourceNotFoundException(
                        ResourceNotFoundException exception,
                        HttpServletRequest request) {
                return ResponseHandler.buildErrorResponse(
                                HttpStatus.NOT_FOUND,
                                exception.getMessage(),
                                request);
        }

        @ExceptionHandler(DuplicateElementException.class)
        public ResponseEntity<ErrorResponse> handleDuplicateElementException(
                        DuplicateElementException exception,
                        HttpServletRequest request) {
                return ResponseHandler.buildErrorResponse(
                                HttpStatus.BAD_REQUEST,
                                exception.getMessage(),
                                request);
        }

        @ExceptionHandler(JwtException.class)
        public ResponseEntity<ErrorResponse> handleJwtException(
                        JwtException exception,
                        HttpServletRequest request) {
                return ResponseHandler.buildErrorResponse(
                                HttpStatus.UNAUTHORIZED,
                                exception.getMessage(),
                                request);
        }

        @ExceptionHandler(AuthException.class)
        public ResponseEntity<ErrorResponse> handleAuthException(
                        AuthException exception,
                        HttpServletRequest request) {
                return ResponseHandler.buildErrorResponse(
                                HttpStatus.UNAUTHORIZED,
                                exception.getMessage(),
                                request);
        }

        @ExceptionHandler(ForbiddenException.class)
        public ResponseEntity<ErrorResponse> handleForbiddenException(
                        ForbiddenException exception,
                        HttpServletRequest request) {
                return ResponseHandler.buildErrorResponse(
                                HttpStatus.FORBIDDEN,
                                exception.getMessage(),
                                request);
        }

        @ExceptionHandler(RateLimitException.class)
        public ResponseEntity<ErrorResponse> handleRateLimitException(
                        RateLimitException exception,
                        HttpServletRequest request) {
                return ResponseHandler.buildErrorResponse(
                                HttpStatus.TOO_MANY_REQUESTS,
                                exception.getMessage(),
                                request);
        }

        @ExceptionHandler(BadRequestException.class)
        public ResponseEntity<ErrorResponse> handleBadRequestException(
                        BadRequestException exception,
                        HttpServletRequest request) {
                return ResponseHandler.buildErrorResponse(
                                HttpStatus.BAD_REQUEST,
                                exception.getMessage(),
                                request);
        }

        @ExceptionHandler(UploadException.class)
        public ResponseEntity<ErrorResponse> handleUploadImageException(
                        UploadException exception,
                        HttpServletRequest request) {
                return ResponseHandler.buildErrorResponse(
                                HttpStatus.BAD_REQUEST,
                                exception.getMessage(),
                                request);
        }

        @ExceptionHandler(MailDeliveryException.class)
        public ResponseEntity<ErrorResponse> handleMailDeliveryException(
                        MailDeliveryException exception,
                        HttpServletRequest request) {
                return ResponseHandler.buildErrorResponse(
                                HttpStatus.BAD_GATEWAY,
                                exception.getMessage(),
                                request);
        }

        @ExceptionHandler(TranscodeException.class)
        public ResponseEntity<ErrorResponse> handleTranscoderException(
                        TranscodeException exception,
                        HttpServletRequest request) {
                return ResponseHandler.buildErrorResponse(
                                HttpStatus.INTERNAL_SERVER_ERROR,
                                exception.getMessage(),
                                request);
        }

        @ExceptionHandler(TranscodeRetryableException.class)
        public ResponseEntity<ErrorResponse> handleTranscodeRetryableException(
                        TranscodeRetryableException exception,
                        HttpServletRequest request) {
                return ResponseHandler.buildErrorResponse(
                                HttpStatus.INTERNAL_SERVER_ERROR, // update this
                                exception.getMessage(),
                                request);
        }

        @ExceptionHandler(TranscodeFatalException.class)
        public ResponseEntity<ErrorResponse> handleTranscodeFatalException(
                        TranscodeFatalException exception,
                        HttpServletRequest request) {
                return ResponseHandler.buildErrorResponse(
                                HttpStatus.INTERNAL_SERVER_ERROR,
                                exception.getMessage(),
                                request);
        }
}
