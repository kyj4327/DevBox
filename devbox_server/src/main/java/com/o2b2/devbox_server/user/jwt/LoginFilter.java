package com.o2b2.devbox_server.user.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.o2b2.devbox_server.user.dto.CustomUserDetails;
import com.o2b2.devbox_server.user.dto.LoginDTO;
import com.o2b2.devbox_server.user.entity.RefreshEntity;
import com.o2b2.devbox_server.user.repository.RefreshRepository;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;

public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private RefreshRepository refreshRepository;


    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil,RefreshRepository refreshRepository) {

        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.refreshRepository = refreshRepository;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        LoginDTO loginDTO = new LoginDTO();

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ServletInputStream inputStream = request.getInputStream();
            String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
            loginDTO = objectMapper.readValue(messageBody, LoginDTO.class);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String username = loginDTO.getUsername();
        String password = loginDTO.getPassword();

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);

        return authenticationManager.authenticate(authToken);
    }

    // Refresh/access 토큰 발급
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {

        //유저 정보
        String username = authentication.getName();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        //토큰 생성
        String accessToken = jwtUtil.createJwt("access", username, role, 600000L); // 10분
        String refreshToken = jwtUtil.createJwt("refresh", username, role, 86400000L);// 24시간

        //Refresh 토큰 저장
        saveRefreshToken(username, refreshToken, 86400000L);

        // AccessToken과 RefreshToken을 쿠키에 추가
        response.setHeader("Authorization", "Bearer " + accessToken);
//        response.addCookie(createCookie("AccessToken", accessToken));
//        response.addCookie(createCookie("RefreshToken", refreshToken));
        createCookieWithSameSite(response, "RefreshToken", refreshToken);

        // 성공 후 리다이렉트
        response.setStatus(HttpStatus.OK.value());
    }

    private void createCookieWithSameSite(HttpServletResponse response, String key, String value) {
        String cookie = String.format("%s=%s; Max-Age=%d; Secure; HttpOnly; SameSite=None; Path=/",
                key, value, 60 * 60 * 24); // 1일
        response.addHeader("Set-Cookie", cookie);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {

        response.setStatus(401);
    }

    private void saveRefreshToken(String username, String refresh, Long expiredMs) {

        Date date = new Date(System.currentTimeMillis() + expiredMs);

        RefreshEntity refreshEntity = new RefreshEntity();
        refreshEntity.setUsername(username);
        refreshEntity.setRefresh(refresh);
        refreshEntity.setExpiration(date.toString());

        refreshRepository.save(refreshEntity);
    }

    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60); // 쿠키 세션 주기
        cookie.setSecure(true); // setSecure = https 통신 진행시 사용
        cookie.setHttpOnly(true); // JavaScript 접근 방지
        cookie.setPath("/");
        cookie.setHttpOnly(true); // 어떤 클라이언트에서 자바스크립트로 해당 쿠키 접근 못하게 막기

        return cookie;
    }
}
