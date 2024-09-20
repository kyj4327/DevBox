package com.o2b2.devbox_server.user.jwt;

import com.o2b2.devbox_server.user.dto.CustomUserDetails;
import com.o2b2.devbox_server.user.entity.UserEntity;
import com.o2b2.devbox_server.user.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// 통합 코드
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;

    public JWTFilter(JWTUtil jwtUtil,
                     UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // 특정 경로는 필터링 제외_회원가입
        String requestURI = request.getRequestURI();
//        if (requestURI.equals("/join") || requestURI.equals("/login") || requestURI.matches("/password/.*")) {

        // 테스트용 로그인 없이 crud 열기
        if (requestURI.equals("/join") || requestURI.equals("/login") || requestURI.matches("/password/.*") 
        || requestURI.matches("/gathermate/.*")
        || requestURI.matches("/edu/.*")
        || requestURI.matches("/project/.*")
        || requestURI.matches("/message/.*")
        || requestURI.matches("/msg/.*")
        || requestURI.matches("/api/contact/.*")
        || requestURI.matches("/send/.*")
        || requestURI.matches("/api/posts")
        || requestURI.matches("/api/posts/.*")
        || requestURI.matches("/api/comments/.*")
        || requestURI.matches("/posts/.*")
        || requestURI.matches("/comments/.*")
         ) {
            System.out.println(requestURI);

            filterChain.doFilter(request, response);
            return;
        }

        String token = null;

        // Step 1: 쿠키에서 AccessToken 추출
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("AccessToken")) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        // Step 2: Authorization 헤더에서 토큰 추출 (쿠키에 토큰이 없을 경우)
        if (token == null) {
            String authorization = request.getHeader("Authorization");
            if (authorization != null && authorization.startsWith("Bearer ")) {
                token = authorization.split(" ")[1];
            }
        }

        // Step 3: 토큰 검증 및 유효성 확인
        if (token == null || token.trim().isEmpty() || !token.contains(".")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
            return;
        }

        // Step 4: 토큰이 access인지 확인
        String category = jwtUtil.getCategory(token);
        if (!"access".equals(category)) {
            filterChain.doFilter(request, response);
            return;
        }

        // Step 5: 토큰에서 사용자 정보 추출
        String username = jwtUtil.getUsername(token); // Username = email
        String role = jwtUtil.getRole(token);

        System.out.println("usrEmail: " + username);

        // Step 6: 사용자 정보를 기반으로 Authentication 객체 생성
        UserEntity userEntity = userRepository.findByEmail(username); // 이메일로 사용자 조회
        if (userEntity == null) {
            // 사용자 정보가 없는 경우
            userEntity = new UserEntity();
            userEntity.setEmail(username);
            userEntity.setRole(role);
            userEntity.setPassword("temppassword"); // 비밀번호는 임시로 설정
        }

        CustomUserDetails customUserDetails = new CustomUserDetails(userEntity);

        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);

        System.out.println("Authentication: " + SecurityContextHolder.getContext().getAuthentication());

        // Step 7: AccessToken을 Authorization 헤더로 설정
        response.setHeader("Authorization", "Bearer " + token);

        // Step 8: 다음 필터로 요청 전달
        filterChain.doFilter(request, response);
    }
}