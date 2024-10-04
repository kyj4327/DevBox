package com.o2b2.devbox_server.user.controller;

import com.o2b2.devbox_server.user.service.PasswordResetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/password")
public class PasswordController {

    private final PasswordResetService passwordResetService;

    // 비밀번호 재설정 인증 코드
    @PostMapping("/code")
    public Map<String, Boolean> sendCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        boolean success = passwordResetService.sendVerificationCode(email);
        return Collections.singletonMap("success", success);
    }

    //  인증 코드 검증
    @PostMapping("/verify")
    public Map<String, Boolean> verifyCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");
        boolean success = passwordResetService.verifyCode(email, code);
        return Collections.singletonMap("success", success);
    }

    // 비밀번호 재설정
    @PostMapping("/reset")
    public ResponseEntity<Map<String, Boolean>> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("newPassword");
        boolean success = passwordResetService.resetPassword(email, newPassword);
        if (success) {
            return ResponseEntity.ok(Collections.singletonMap("success", true));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("success", false));
        }
    }
}
