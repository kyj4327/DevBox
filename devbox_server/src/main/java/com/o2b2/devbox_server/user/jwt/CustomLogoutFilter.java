package com.o2b2.devbox_server.user.jwt;

import com.o2b2.devbox_server.user.repository.RefreshRepository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

public class CustomLogoutFilter extends GenericFilterBean {

    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;

    public CustomLogoutFilter(JWTUtil jwtUtil, RefreshRepository refreshRepository) {
        this.jwtUtil = jwtUtil;
        this.refreshRepository = refreshRepository;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
    }

    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {

        // Path and method verification
        String requestUri = request.getRequestURI();
        if (!requestUri.equals("/logout")) {
            filterChain.doFilter(request, response);
            return;
        }

        String requestMethod = request.getMethod();
        if (!requestMethod.equalsIgnoreCase("POST")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Get Refresh Token from cookies
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("RefreshToken".equals(cookie.getName())) {
                    refresh = cookie.getValue();
                    break;
                }
            }
        }

        // Proceed with logout regardless of refresh token validity
        if (refresh != null) {
            try {
                // Check if the refresh token is expired
                jwtUtil.isExpired(refresh);

                // Check if the token is a refresh token
                String category = jwtUtil.getCategory(refresh);
                if ("refresh".equals(category)) {
                    // Check if the refresh token exists in the database
                    if (refreshRepository.existsByRefresh(refresh)) {
                        // Remove the refresh token from the database
                        refreshRepository.deleteByRefresh(refresh);
                    }
                }

            } catch (ExpiredJwtException e) {

            } catch (Exception e) {

            }
        }

        // Delete Refresh Token and JSESSIONID cookies by setting Max-Age=0 and including SameSite=None; Secure
        deleteCookie(response, "RefreshToken");
        deleteCookie(response, "JSESSIONID");

        // Invalidate the session
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        // Respond with 200 OK
        response.setStatus(HttpServletResponse.SC_OK);
    }

    private void deleteCookie(HttpServletResponse response, String name) {
        // Construct the Set-Cookie header manually to include SameSite attribute
        String cookie = String.format("%s=; Max-Age=0; Path=/; Secure; HttpOnly; SameSite=None", name);
        response.addHeader("Set-Cookie", cookie);
    }
}
