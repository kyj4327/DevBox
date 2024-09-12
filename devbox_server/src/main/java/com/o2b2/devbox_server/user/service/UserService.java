package com.o2b2.devbox_server.user.service;

import com.o2b2.devbox_server.user.dto.CustomUserDetails;
import com.o2b2.devbox_server.user.entity.UserEntity;
import com.o2b2.devbox_server.user.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 현재 로그인된 사용자의 정보 조회
    public Map<String, Object> getCurrentUserInfo(Authentication authentication) {
        Map<String, Object> userInfo = new HashMap<>();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();

            if (principal instanceof CustomUserDetails) {
                CustomUserDetails userDetails = (CustomUserDetails) principal;
                UserEntity userEntity = userDetails.getUserEntity();

                if (userEntity != null) {
                    userInfo.put("email", userEntity.getEmail());
                    userInfo.put("nickname", userEntity.getNickname());
                    userInfo.put("name", userEntity.getName());
                    userInfo.put("role", userEntity.getRole());
                    userInfo.put("field", userEntity.getField());
                } else {
                    userInfo.put("error", "User entity: null");
                }
            } else {
                userInfo.put("error", "Unsupported user type");
            }
        } else {
            userInfo.put("error", "User : not authenticated");
        }
        return userInfo;
    }

    // 현재 로그인된 사용자의 정보 업데이트
    public void updateUserInfo(Map<String, String> updatedUserInfo, Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();

            if (principal instanceof CustomUserDetails) {
                CustomUserDetails userDetails = (CustomUserDetails) principal;
                UserEntity userEntity = userDetails.getUserEntity();

                if (userEntity != null) {
                    userEntity.setNickname(updatedUserInfo.get("nickname"));
                    userEntity.setName(updatedUserInfo.get("name"));
                    userEntity.setRole(updatedUserInfo.get("role"));
                    userEntity.setField(updatedUserInfo.get("field"));

                    userRepository.save(userEntity);
                }
            }
        }
    }

    // 현재 로그인된 사용자의 계정 삭제
    public void deleteCurrentUser(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();

            if (principal instanceof CustomUserDetails) {
                CustomUserDetails userDetails = (CustomUserDetails) principal;
                UserEntity userEntity = userDetails.getUserEntity();

                if (userEntity != null) {
                    userRepository.delete(userEntity);
                }
            }
        }
    }
}