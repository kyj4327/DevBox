package com.o2b2.devbox_server.user.controller;

import com.o2b2.devbox_server.user.dto.UpdateUserInfoDTO;
import com.o2b2.devbox_server.user.repository.UserRepository;
import com.o2b2.devbox_server.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    
    @Autowired
    UserRepository userRepository;

    @GetMapping("/nicknames")
    public ResponseEntity<List<String>> getAllNicknames() {
        List<String> nicknames = userRepository.findAllNicknames();
        return ResponseEntity.ok(nicknames);  // 닉네임 목록 반환
    }

    // 현재 로그인된 사용자의 정보 조회
    @GetMapping("/me")
    public Map<String, Object> getCurrentUser(Authentication authentication) {
        return userService.getCurrentUserInfo(authentication);
    }

    // 현재 로그인된 사용자의 정보 업데이트
    @PutMapping("/update")  // 또는 @PatchMapping("/update")
    public ResponseEntity<?> updateUser(@Valid @RequestBody UpdateUserInfoDTO updatedUserInfo, Authentication authentication) {
        userService.updateUserInfo(updatedUserInfo, authentication);
        return ResponseEntity.ok("User information updated successfully.");
    }

    // 계정 탈퇴
    @DeleteMapping("/delete")
    public void deleteUser(Authentication authentication) {
        userService.deleteCurrentUser(authentication);
    }
}