package com.o2b2.devbox_server.user.oauth2;

import com.o2b2.devbox_server.user.dto.CustomOAuth2User;
import com.o2b2.devbox_server.user.entity.RefreshEntity;
import com.o2b2.devbox_server.user.jwt.JWTUtil;
import com.o2b2.devbox_server.user.repository.RefreshRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Component
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JWTUtil jwtUtil;
    private final RefreshRepository refreshRepository;

    private static final List<String> ALLOWED_REDIRECT_URIS = Arrays.asList(
            "https://devbox.world",
            "https://devboxworld.netlify.app"
    );

    public CustomSuccessHandler(JWTUtil jwtUtil, RefreshRepository refreshRepository) {
        this.jwtUtil = jwtUtil;
        this.refreshRepository = refreshRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        //OAuth2User
        CustomOAuth2User customOAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        // 사용자 이름 (이메일) 추출
        String username = customOAuth2User.getUserDTO().getEmail();

//        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
//        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
//        GrantedAuthority auth = iterator.next();
//        String role = auth.getAuthority();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String role = authorities.iterator().next().getAuthority();

        // AccessToken과 RefreshToken의 category를 정의
        String accessTokenCategory = "access";
        String refreshTokenCategory = "refresh";

        // AccessToken과 RefreshToken 생성
        System.out.println("Before Access Token Creation: username = " + username);
        String accessToken = jwtUtil.createJwt("access", username, role, 600000L);

        System.out.println("Before Refresh Token Creation: username = " + username);
        String refreshToken = jwtUtil.createJwt(refreshTokenCategory, username, role, 86400000L); // 1일

        // 생성된 RefreshToken을 DB에 저장
        saveRefreshToken(username, refreshToken, 86400000L);

        // AccessToken과 RefreshToken
//        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Authorization", "Bearer " + accessToken);

        response.addCookie(createCookie("RefreshToken", refreshToken));

        // AccessToken을 URL 해시(fragment)에 포함하여 프론트엔드로 리다이렉트
//        String redirectUrl = "https://devbox.world/#accessToken=" + URLEncoder.encode(accessToken, StandardCharsets.UTF_8.name());
        String defaultRedirectUri = "https://devbox.world";
        String netlifyRedirectUri = "https://devboxworld.netlify.app";

        // 요청의 Referer 헤더를 확인하여 리다이렉트 URL 결정
        String referer = request.getHeader("Referer");
        String redirectUri = defaultRedirectUri; // 기본값 설정

        if (referer != null) {
            for (String allowedUri : ALLOWED_REDIRECT_URIS) {
                if (referer.startsWith(allowedUri)) {
                    redirectUri = allowedUri;
                    break;
                }
            }
        }

        String redirectUrl = redirectUri + "/#accessToken=" + URLEncoder.encode(accessToken, StandardCharsets.UTF_8.name());


        // 성공 후 리다이렉트
//        response.setStatus(HttpStatus.OK.value());
//        response.sendRedirect("http://localhost:3000/home");

        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }

    // RefreshToken을 DB에 저장하는 메서드
    private void saveRefreshToken(String username, String refreshToken, Long expiredMs) {
        Date expirationDate = new Date(System.currentTimeMillis() + expiredMs);
        RefreshEntity refreshEntity = new RefreshEntity();
        refreshEntity.setUsername(username);
        refreshEntity.setRefresh(refreshToken);
        refreshEntity.setExpiration(expirationDate.toString());

        refreshRepository.save(refreshEntity);
    }

    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(60*60*24*30); // 30일
        cookie.setSecure(true); // HTTPS 경우에 설정
        cookie.setPath("/");
        cookie.setHttpOnly(true);

        return cookie;
    }
}
