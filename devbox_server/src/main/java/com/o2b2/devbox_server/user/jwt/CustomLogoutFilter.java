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
import java.util.Arrays;
import java.util.List;

public class CustomLogoutFilter extends GenericFilterBean {

        private final JWTUtil jwtUtil;
        private final RefreshRepository refreshRepository;

        private static final List<String> ALLOWED_REDIRECT_URIS = Arrays.asList(
                "https://devbox.world",
                "https://devboxworld.netlify.app"
        );


        public CustomLogoutFilter(JWTUtil jwtUtil, RefreshRepository refreshRepository) {

            this.jwtUtil = jwtUtil;
            this.refreshRepository = refreshRepository;
        }

        @Override
        public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

            doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
        }

        private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {

            //path and method verify
            String requestUri = request.getRequestURI();
//            if (!requestUri.matches("^\\/logout$")) {
            if (!requestUri.equals("/logout")) {
                filterChain.doFilter(request, response);
                return;
            }

            String requestMethod = request.getMethod();
            if (!requestMethod.equals("POST")) {
                filterChain.doFilter(request, response);
                return;
            }

            //get refresh token
            String refresh = null;
            Cookie[] cookies = request.getCookies();
            if (cookies != null) { // Null check 추가
                for (Cookie cookie : cookies) {
                    if ("RefreshToken".equals(cookie.getName())) {
                        refresh = cookie.getValue();
                        break;
                    }
                }
            }

            //refresh null check
            if (refresh == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                return;
            }

            //expired check
            try {
                jwtUtil.isExpired(refresh);
            } catch (ExpiredJwtException e) {

                //response status code
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                return;
            }

            // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
            String category = jwtUtil.getCategory(refresh);
            if (!category.equals("refresh")) {

                //response status code
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                return;
            }

            //DB에 저장되어 있는지 확인
            Boolean isExist = refreshRepository.existsByRefresh(refresh);
            if (!isExist) {
                //response status code
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                return;
            }

            //로그아웃 진행
            //Refresh 토큰 DB에서 제거
            refreshRepository.deleteByRefresh(refresh);

            //Refresh 토큰 Cookie 값 0
            Cookie cookie = new Cookie("RefreshToken", null);
            cookie.setMaxAge(0);
            cookie.setPath("/");

            response.addCookie(cookie);

            // JSESSIONID 쿠키 삭제
            Cookie jsessionidCookie = new Cookie("JSESSIONID", null);
            jsessionidCookie.setMaxAge(0);  // 만료 시간 설정
            jsessionidCookie.setPath("/");  // 경로 설정
            response.addCookie(jsessionidCookie);  // 쿠키 삭제

            // 세션 무효화
            HttpSession session = request.getSession(false);
            if (session != null) {
                session.invalidate();
            }

            response.setStatus(HttpServletResponse.SC_OK);

        }
    }
