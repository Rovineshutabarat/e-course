package com.lerneon.backend.utils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;

import java.util.Arrays;
import java.util.Optional;

public class CookieUtil {
    private static final String SAME_SITE = System.getenv().getOrDefault("COOKIE_SAMESITE", "Strict");
    private static final boolean SECURE = Boolean.parseBoolean(System.getenv().getOrDefault("COOKIE_SECURE", "false"));

    public static Optional<String> getCookie(String name) {
        HttpServletRequest request = RequestUtil.getCurrentRequest();
        if (request.getCookies() != null) {
            return Arrays.stream(request.getCookies())
                    .filter(cookie -> cookie.getName().equals(name))
                    .map(Cookie::getValue)
                    .findFirst();
        }
        return Optional.empty();
    }

    public static void setCookie(HttpServletResponse response, String name, String value, Long maxAge) {
        ResponseCookie responseCookie = ResponseCookie.from(name, value)
                .httpOnly(true)
                .secure(SECURE)
                .path("/")
                .maxAge(maxAge)
                .sameSite(SAME_SITE)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, responseCookie.toString());
    }

    public static void removeCookie(HttpServletResponse response, String name) {
        ResponseCookie responseCookie = ResponseCookie.from(name, "")
                .httpOnly(true)
                .secure(SECURE)
                .path("/")
                .maxAge(0)
                .sameSite(SAME_SITE)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, responseCookie.toString());
    }
}
