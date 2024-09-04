package com.o2b2.devbox_server.user.service;

import com.o2b2.devbox_server.user.entity.UserEntity;
import com.o2b2.devbox_server.user.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class PasswordResetService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final EmailService emailService;
    private final Map<String, String> verificationCodes = new HashMap<>();

    public PasswordResetService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, EmailService emailService) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.emailService = emailService;
    }

    // 이메일로 인증 코드 발송
    public boolean sendVerificationCode(String email) {
        UserEntity user = userRepository.findByEmail(email);

        if (user == null) {
            return false;
        }
        // 소셜 로그인 계정인지 확인
        if (user.getProvider() != null) {
            return false; // 소셜 계정의 경우 코드 발송 불가
        }

        String code = generateVerificationCode();
        verificationCodes.put(email, code);

        // 이메일 전송 로직
        emailService.sendVerificationCode(email, code);

        return true;
    }

    // 인증 코드 검증
    public boolean verifyCode(String email, String code) {
        String storedCode = verificationCodes.get(email);

        if (storedCode != null && storedCode.equals(code)) {
            verificationCodes.remove(email); // 인증이 완료되면 코드를 삭제
            return true;
        }

        return false;
    }

    // 비밀번호 재설정
    public boolean resetPassword(String email, String newPassword) {
        UserEntity user = userRepository.findByEmail(email);

        if (user == null) {
            return false;
        }

        // 소셜 로그인 계정인지 확인
        if (user.getProvider() != null) {
            return false; // 소셜 계정의 경우 비밀번호 재설정 불가
        }

        user.setPassword(bCryptPasswordEncoder.encode(newPassword));
        userRepository.save(user);

        return true;
    }

    // 6자리 인증 코드 생성
    private String generateVerificationCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000); // 6자리 숫자 코드 생성
        return String.valueOf(code);
    }
}
