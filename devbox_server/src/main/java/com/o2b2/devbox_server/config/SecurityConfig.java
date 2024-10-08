package com.o2b2.devbox_server.config;

import com.o2b2.devbox_server.user.jwt.CustomLogoutFilter;
import com.o2b2.devbox_server.user.jwt.JWTFilter;
import com.o2b2.devbox_server.user.jwt.JWTUtil;
import com.o2b2.devbox_server.user.jwt.LoginFilter;
import com.o2b2.devbox_server.user.oauth2.CustomSuccessHandler;
import com.o2b2.devbox_server.user.repository.RefreshRepository;
import com.o2b2.devbox_server.user.repository.UserRepository;
import com.o2b2.devbox_server.user.service.CustomOAuth2UserService;
import com.o2b2.devbox_server.user.service.CustomUserDetailsService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        private final AuthenticationConfiguration authenticationConfiguration;

        private final CustomOAuth2UserService customOAuth2UserService;
        private final CustomSuccessHandler customSuccessHandler;

        private final CustomUserDetailsService customUserDetailsService;
        private final RefreshRepository refreshRepository;
        private final UserRepository userRepository;

        private final JWTUtil jwtUtil;

        public SecurityConfig(AuthenticationConfiguration authenticationConfiguration,
                        CustomOAuth2UserService customOAuth2UserService,
                        CustomSuccessHandler customSuccessHandler,
                        CustomUserDetailsService customUserDetailsService,
                        RefreshRepository refreshRepository,
                        UserRepository userRepository,
                        JWTUtil jwtUtil) {

                this.authenticationConfiguration = authenticationConfiguration;

                this.customOAuth2UserService = customOAuth2UserService;
                this.customSuccessHandler = customSuccessHandler;
                this.customUserDetailsService = customUserDetailsService;
                this.refreshRepository = refreshRepository;
                this.jwtUtil = jwtUtil;
                this.userRepository = userRepository;
        }

        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {

                return configuration.getAuthenticationManager();
        }

        @Bean
        public BCryptPasswordEncoder bCryptPasswordEncoder() {

                return new BCryptPasswordEncoder();
        }

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

                http
                                .cors(corsCustomizer -> corsCustomizer
                                                .configurationSource(new CorsConfigurationSource() {

                                                        @Override
                                                        public CorsConfiguration getCorsConfiguration(
                                                                        HttpServletRequest request) {

                                                                CorsConfiguration configuration = new CorsConfiguration();

                                                                configuration.setAllowedOrigins(Collections
                                                                                .singletonList("https://devbox.world"));
//                                                                configuration.setAllowedOrigins(Arrays.asList(
//                                                                        "https://devbox.world",
//                                                                        "https://devboxworld.netlify.app"
//                                                                ));
                                                                configuration.setAllowedMethods(
                                                                                Collections.singletonList("*"));
                                                                configuration.setAllowCredentials(true);
                                                                configuration.setAllowedHeaders(
                                                                                Collections.singletonList("*"));
                                                                configuration.setMaxAge(3600L);

//                                                                configuration.setExposedHeaders(Collections
//                                                                                .singletonList("Set-Cookie"));
//                                                                configuration.setExposedHeaders(Collections
//                                                                                .singletonList("Authorization"));
                                                                configuration.setExposedHeaders(Arrays.asList("Set-Cookie", "Authorization")); // 두 헤더 모두 설정

                                                                return configuration;
                                                        }
                                                }));

                // csrf disable
                http
                                .csrf((auth) -> auth.disable());

                // From 로그인 방식 disable
                http
                                .formLogin((auth) -> auth.disable());

                // http basic 인증 방식 disable
                http
                                .httpBasic((auth) -> auth.disable());

                /**
                 * 인가 백엔드 수신 HTTP 요청에 대한 권한을 설정
                 **/
                http
                                .authorizeHttpRequests((auth) -> auth
                                                .requestMatchers("/login", "/", "/join").permitAll()
                                                .requestMatchers("/admin").hasRole("ADMIN")
                                                .requestMatchers("/user").hasRole("USER")

                                                .requestMatchers("/reissue").permitAll()
                                                .requestMatchers("/oauth2/**").permitAll()

                                                .requestMatchers("/password/**").permitAll() // 비밀번호 재설정 관련 경로에 접근 허용
                                                .requestMatchers("/api/user/me").authenticated() // <- 인증된 사용자만 접근 가능하도록
                                                .requestMatchers("/api/user/delete").authenticated() // <- 회원 탈퇴
                                                .requestMatchers("/api/user/nicknames").authenticated() // <- 회원 탈퇴

                                                // gatherMate 리스트는 누구나
                                                .requestMatchers("/gathermate/lists").permitAll()
                                                .requestMatchers("/gathermate/lists**").permitAll()
                                                .requestMatchers("/gathermate/lists/**").permitAll()
                                                // 모집중/모집완료
                                                .requestMatchers("/gathermate/edit/*/recruiting").authenticated()

                                                // 댓글
                                                .requestMatchers("/gathermate/*/comments").authenticated()
                                                .requestMatchers("/gathermate/comments/*/edit").authenticated()
                                                .requestMatchers("/gathermate/comments/*/delete").authenticated()
                                                .requestMatchers("/gathermate/*/commentslist").permitAll()

                                                // gatherMate 상세는 누구나
                                                .requestMatchers("/gathermate/detail/**").permitAll()
                                                .requestMatchers("/gathermate/posts/**").permitAll()
                                                .requestMatchers("/gathermate/posts**").permitAll()
                                                .requestMatchers("/gathermate/likes/**").authenticated()
                                                .requestMatchers("/gathermate/likes").authenticated()
                                                // 좋아요 했는지 확인 유무.
                                                .requestMatchers("/gathermate/isLiked/posts/*").authenticated()

                                                // gatherMate 글 작성 페이지는 로그인 사용자
                                                .requestMatchers("/gathermate/write").authenticated()
                                                // gatherMate 글 수정 페이지는 로그인 사용자
                                                .requestMatchers("/gathermate/edit/**").authenticated()

                                                // 가입인사
                                                // greeting 리스트는 누구나
                                                .requestMatchers("/greeting/lists").permitAll()
                                                .requestMatchers("/greeting/lists**").permitAll()
                                                .requestMatchers("/greeting/lists/**").permitAll()

                                                // greeting댓글
                                                .requestMatchers("/greeting/*/comments").authenticated()
                                                .requestMatchers("/greeting/comments/*/edit").authenticated()
                                                .requestMatchers("/greeting/comments/*/delete").authenticated()
                                                .requestMatchers("/greeting/*/commentslist").permitAll()

                                                // greeting 상세는 누구나
                                                .requestMatchers("/greeting/detail/**").permitAll()
                                                .requestMatchers("/greeting/posts/**").permitAll()
                                                .requestMatchers("/greeting/posts").authenticated()

                                                // greeting 글 작성 페이지는 로그인 사용자
                                                .requestMatchers("/greeting/write").authenticated()
                                                .requestMatchers("/greeting/write").authenticated()
                                                // greeting 글 수정 페이지는 로그인 사용자
                                                .requestMatchers("/greeting/edit/**").authenticated()

                                                // 공지사항
                                                .requestMatchers("/notice/write").hasRole("ADMIN")
                                                .requestMatchers("/notice/posts/**").permitAll()
                                                .requestMatchers("/notice/posts").authenticated()
                                                .requestMatchers("/notice/posts**").authenticated()

                                                // 공모전 공고
                                                .requestMatchers("/contest/list*").permitAll()
//                                                .requestMatchers("/contest/write").authenticated()
                                                .requestMatchers("/contest/write").hasRole("ADMIN")
                                                .requestMatchers("/contest/update**").authenticated()
                                                .requestMatchers("/contest/update**").hasRole("ADMIN")
                                                .requestMatchers("/contest/delete**").authenticated()
                                                .requestMatchers("/contest/delete**").hasRole("ADMIN")

                                                // 채용 공고
                                                .requestMatchers("/hiring/list/**").permitAll()
//                                                .requestMatchers("/hiring/write").authenticated()
                                                .requestMatchers("/hiring/write").hasRole("ADMIN")
                                                .requestMatchers("/hiring/update**").authenticated()
                                                .requestMatchers("/hiring/update**").hasRole("ADMIN")
                                                .requestMatchers("/hiring/delete**").authenticated()
                                                .requestMatchers("/hiring/delete**").hasRole("ADMIN")

                                                // 추천해요
                                                .requestMatchers("/reference/list/**").permitAll()
                                                .requestMatchers("/reference/mylist/**").authenticated()
                                                .requestMatchers("/reference/write").authenticated()
                                                .requestMatchers("/reference/update**").authenticated()
                                                .requestMatchers("/reference/delete**").authenticated()

                                                // 6층 회의실 예약
                                                .requestMatchers("/reservation/write/**").permitAll()
                                                .requestMatchers("/reservation/write").hasAnyRole("ADMIN", "STUDENT")
                                                .requestMatchers("/reservation/availability").authenticated()
                                                .requestMatchers("/reservation/check/**").authenticated()
                                                .requestMatchers("/reservation/delete**").authenticated()
                                                .requestMatchers("/reservation/delete**").hasAnyRole("ADMIN", "STUDENT")

                                                .requestMatchers("/*/download/**").permitAll()
                                                // 교육 정보
                                                .requestMatchers("/edu/list/").permitAll()
                                                .requestMatchers("/edu/detail/").permitAll()
                                                .requestMatchers("/edu/list/**").permitAll()
                                                .requestMatchers("/edu/detail/**").permitAll()
                                                .requestMatchers("/edu/write").authenticated()
                                                .requestMatchers("/edu/update/**").authenticated()
                                                .requestMatchers("/edu/delete/**").authenticated()
                                                .requestMatchers("/edu/delete").authenticated()
                                                .requestMatchers("/edu/**").permitAll()

                                                // 프로젝트 자랑
                                                .requestMatchers("/project/list/").permitAll()
                                                .requestMatchers("/project/detail/").permitAll()
                                                .requestMatchers("/project/list/**").permitAll()
                                                .requestMatchers("/project/detail/**").permitAll()
                                                .requestMatchers("/project/write").authenticated()
                                                .requestMatchers("/project/update/**").authenticated()
                                                .requestMatchers("/project/mylist/**").authenticated()
                                                .requestMatchers("/project/mylist**").authenticated()
                                                .requestMatchers("/project/delete/**").authenticated()
                                                .requestMatchers("/project/delete").authenticated()
                                                .requestMatchers("/project/**").permitAll()

                                                // 쪽지
                                                .requestMatchers("/msg/bell").authenticated()
                                                .requestMatchers("/message/**").permitAll()
                                                .requestMatchers("/msg/**").authenticated()
                                                .requestMatchers("/msg/list**").authenticated()
                                                .requestMatchers("/msg/**").authenticated()
                                                .requestMatchers("/msg/list**").authenticated()

                                                // FAQ
                                                .requestMatchers("/send/**").permitAll()
                                                .requestMatchers("/api/contact/**").permitAll()

                                                // 자유게시판
                                                .requestMatchers("/api/posts/**").permitAll()
                                                .requestMatchers("/api/comments/**").permitAll()
                                                .requestMatchers("/posts/**").permitAll()
                                                .requestMatchers("/comments/**").permitAll()
                                                .requestMatchers("/freeboard/list/**").permitAll()

                                                .anyRequest().authenticated());

                http
                                // .addFilterBefore(new JWTFilter(jwtUtil,userRepository), LoginFilter.class)
                                // .addFilterAfter(new JWTFilter(jwtUtil,userRepository),
                                // OAuth2LoginAuthenticationFilter.class)
                                // .addFilterBefore(new JWTFilter(jwtUtil, userRepository),
                                // UsernamePasswordAuthenticationFilter.class);
                                // .addFilterAfter(new JWTFilter(jwtUtil, userRepository),
                                // AnonymousAuthenticationFilter.class);

                                .addFilterBefore(new JWTFilter(jwtUtil, userRepository),
                                                UsernamePasswordAuthenticationFilter.class);

                http
                                .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration),
                                                jwtUtil, refreshRepository),
                                                UsernamePasswordAuthenticationFilter.class);

                // 로그아웃
                http
                                .addFilterBefore(new CustomLogoutFilter(jwtUtil, refreshRepository),
                                                LogoutFilter.class);
                // oauth2
                http
                                .oauth2Login((oauth2) -> oauth2
                                                .userInfoEndpoint((userInfoEndpointConfig) -> userInfoEndpointConfig
                                                                .userService(customOAuth2UserService))
                                                .successHandler(customSuccessHandler));

                // 세션 설정 : STATELESS
                http
                                .sessionManagement((session) -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

                return http.build();
        }
}
