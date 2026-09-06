package com.lerneon.backend.filter;

import org.springframework.stereotype.Component;

@Component
public class RateLimitFilter {
    // implement Filter
    // private final ConcurrentMap<String, Bucket> buckets = new
    // ConcurrentHashMap<>();

    // private Bucket getBucket(String clientId) {
    // return buckets
    // .computeIfAbsent(clientId,
    // k -> Bucket.builder().addLimit(
    // Bandwidth.classic(20, Refill.intervally(1, Duration.ofSeconds(1))))
    // .build());
    // }

    // @Override
    // public void doFilter(ServletRequest request, ServletResponse response,
    // FilterChain chain)
    // throws IOException, ServletException {
    // HttpServletRequest httpRequest = (HttpServletRequest) request;
    // String clientIp = httpRequest.getRemoteAddr();
    // Bucket bucket = getBucket(clientIp);

    // if (bucket.tryConsume(1)) {
    // chain.doFilter(request, response);
    // } else {
    // response.getWriter().write("Too Many Requests");
    // response.getWriter().flush();
    // }
    // }
}
