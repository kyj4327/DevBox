package com.o2b2.devbox_server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {


    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        // 회원가입시 패스워드 암호화 할때 사용
        return new BCryptPasswordEncoder();
    }


    // SecurityFilterChain
    // HttpSecurity = 클라이언트에서 넘어온 요청 url 정보 담는다.
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        //  권한 부여 규칙 정하기.
        http.authorizeHttpRequests(authz -> authz
// 규칙예시
//                .requestMatchers("/board/**").permitAll() // "/board/**" 경로는 인증 없이 접근 허용
//                .requestMatchers("/admin/**").hasRole("ADMIN") // admin 권한 있는 사람만 인증, 요청 허용
//                .requestMatchers("/user/**").hasAnyRole("STUDENT", "ADMIN") // /user으로 시작하는 경로는 USER 또는 ADMIN 역할을 가진 사용자 접근 가능
//                .anyRequest().authenticated() // 나머지 모든 요청은 인증 요구

                                .requestMatchers("/api/**").authenticated() // api/** 경로는 인증 후 접근 가능
                                .anyRequest().permitAll() // 나머지 모든 경로는 인증없이 접근 허용.
                )
                // [구글로그인] : http://localhost:8081 [/oauth2/authorization/google]--->구글로 로그인을 시도하는 URL
                // http://localhost:8081/member  허용해준 Url 말고 다른 요청->로그인 해야한다 -> 로그인 2가지(url 로그인 + 구글 로그인) -> 로그인 페이지로 보내기
                .oauth2Login(oauth2->oauth2 // 요청이 오면 시큐리티가 해당 요청 가로채서 구글 로그인으로 넘긴다.
                        .loginPage("/")
                        .defaultSuccessUrl("/") // 성공했을때 경로
                        .permitAll()
                )
                .formLogin(form->form
                        .loginPage("/") // login page URL -> /login -> MainController -> View(index.html)
                        .loginProcessingUrl("/loginProcess") // 스프링시큐리티(url 가로채기: username, password)에게 제어권을 넘긴다.
                        .defaultSuccessUrl("/profile",true) // 성공했을때 리다이렉트 주소
                        .failureUrl("/?error=true") // 로그인 실패시 받는것.
                        .permitAll() // 로그인 페이지 URL -> /login -> Controller -> View(CustomLogin.html)
                )
                .logout(logout -> logout
                                .logoutUrl("/logout") // 로그아웃 URL -> 스프링 시큐리티가 가로채기 해서 로그아웃 처리 해준다.

                                .logoutSuccessUrl("/?logout=true") // 로그아웃 성공 후 리다이렉션할 URL
                                .invalidateHttpSession(true) // 세션 무효화
                                .deleteCookies("JSESSIONID") // 로그아웃 시 삭제할 쿠키 이름

//                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "GET")) // GET 요청으로 로그아웃 허용
//                        .clearAuthentication(true) // 로그아웃 시 인증정보 클리어(SecurityContext)
                );
        return http.build();
    }
}
