package com.o2b2.devbox_server.user.controller;

import com.o2b2.devbox_server.user.dto.CustomUserDetails;
import com.o2b2.devbox_server.user.entity.UserEntity;
import com.o2b2.devbox_server.user.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 현재 로그인된 사용자의 정보 조회
    @GetMapping("/me")
    public Map<String, Object> getCurrentUser2(Authentication authentication) {
        Map<String, Object> userInfo = new HashMap<>();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();

            System.out.println("Principal Class: " + principal);

            if (principal instanceof CustomUserDetails) {
                CustomUserDetails userDetails = (CustomUserDetails) principal;
                UserEntity userEntity = userDetails.getUserEntity();

                // 디버깅을 위해 추가 로그 출력
                System.out.println("UserEntity: " + userEntity);

                if (userEntity != null) {
                    userInfo.put("email", userEntity.getEmail());
                    userInfo.put("nickname", userEntity.getNickname());
                    userInfo.put("name", userEntity.getName());
                } else {
                    userInfo.put("error", "User entity: null");
                    System.out.println("User entity: null");
                }
            } else {
                userInfo.put("error", "Unsupported user type");
                System.out.println("Unsupported user type: " + principal.getClass().getName());
            }
        } else {
            userInfo.put("error", "User : not authenticated");
            System.out.println("User : not authenticated");
        }
        return userInfo;
    }
}
