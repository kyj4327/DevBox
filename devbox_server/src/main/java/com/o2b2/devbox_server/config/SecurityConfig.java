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
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

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
                .cors(corsCustomizer -> corsCustomizer.configurationSource(new CorsConfigurationSource() {

                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {

                        CorsConfiguration configuration = new CorsConfiguration();

                        configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
                        configuration.setAllowedMethods(Collections.singletonList("*"));
                        configuration.setAllowCredentials(true);
                        configuration.setAllowedHeaders(Collections.singletonList("*"));
                        configuration.setMaxAge(3600L);

                        configuration.setExposedHeaders(Collections.singletonList("Set-Cookie"));
                        configuration.setExposedHeaders(Collections.singletonList("Authorization"));

                        return configuration;
                    }
                }));

        //csrf disable
        http
                .csrf((auth) -> auth.disable());

        //From 로그인 방식 disable
        http
                .formLogin((auth) -> auth.disable());

        //http basic 인증 방식 disable
        http
                .httpBasic((auth) -> auth.disable());

        /**
        인가 백엔드 수신 HTTP 요청에 대한 권한을 설정
         **/
        http
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/login", "/", "/join").permitAll()
                        .requestMatchers("/admin").hasRole("ADMIN")
                        .requestMatchers("/user").hasRole("USER")
                        .requestMatchers("/reissue").permitAll()
                        .requestMatchers("/password/**").permitAll() // 비밀번호 재설정 관련 경로에 접근 허용
                        .requestMatchers("/api/user/me").authenticated() // <- 인증된 사용자만 접근 가능하도록 설정



                        // gatherMate 리스트는 누구나
                        .requestMatchers("/gathermate/list").permitAll()

                        // gatherMate 상세는 누구나
                        .requestMatchers("/gathermate/detail/**").permitAll()
                        .requestMatchers("/gathermate/posts/**").permitAll()
                        .requestMatchers("/gathermate/posts").authenticated()
                        .requestMatchers("/gathermate/likes/**").authenticated()
                        .requestMatchers("/gathermate/likes").authenticated()

                        // gatherMate 글 작성 페이지는 로그인 사용자
                        .requestMatchers("/gathermate/write").authenticated()
                        .requestMatchers("/reference/write").authenticated()
                        // gatherMate 글 수정 페이지는 로그인 사용자
                        .requestMatchers("/gathermate/edit/**").authenticated()


                        /**
                         추천해요, 프로젝트 자랑 게시판
                         */
                        // 글쓰기
                        .requestMatchers("/*/write").authenticated()
                        .requestMatchers("/*/write/**").authenticated()

                        .requestMatchers("/*/update").authenticated()
                        .requestMatchers("/*/update/**").authenticated()
                        .requestMatchers("/*/delete").authenticated()
                        .requestMatchers("/*/delete/**").authenticated()

                        .requestMatchers("/*/list/**").permitAll()



                        // 알림 기능은 로그인한 사용자만 접근 가능
                        .requestMatchers("/msg/bell").authenticated()

                        .requestMatchers("/edu/**").permitAll()
                        .requestMatchers("/project/**").permitAll()
                        .requestMatchers("/message/**").permitAll()

//                        .requestMatchers("/msg/**").permitAll()

                        .anyRequest().authenticated());

        http
                .addFilterBefore(new JWTFilter(jwtUtil,userRepository), LoginFilter.class)
                .addFilterAfter(new JWTFilter(jwtUtil,userRepository), OAuth2LoginAuthenticationFilter.class)
                .addFilterBefore(new JWTFilter(jwtUtil, userRepository), UsernamePasswordAuthenticationFilter.class);

        http
                .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil, refreshRepository), UsernamePasswordAuthenticationFilter.class);

        // 로그아웃
        http
                .addFilterBefore(new CustomLogoutFilter(jwtUtil, refreshRepository), LogoutFilter.class);
        //oauth2
        http
                .oauth2Login((oauth2) -> oauth2
                        .userInfoEndpoint((userInfoEndpointConfig) -> userInfoEndpointConfig
                                .userService(customOAuth2UserService))
                        .successHandler(customSuccessHandler)
                );

        //세션 설정 : STATELESS
        http
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}
