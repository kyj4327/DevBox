package com.o2b2.devbox_server.user.controller;

import com.o2b2.devbox_server.user.dto.JoinDTO;
import com.o2b2.devbox_server.user.entity.UserEntity;
import com.o2b2.devbox_server.user.repository.UserRepository;
import com.o2b2.devbox_server.user.service.JoinService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@ResponseBody
public class JoinController {

    private final JoinService joinService;
    private final UserRepository userRepository;

    public JoinController(JoinService joinService, UserRepository userRepository) {

        this.joinService = joinService;
        this.userRepository = userRepository;
    }

    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody JoinDTO joinDTO) {
        try {
            joinService.joinProcess(joinDTO);
            return ResponseEntity.ok("DevBox에 오신것을 환영합니다!");  // 200 OK 응답
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());  // 409 Conflict 응답
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입에 실패했습니다.");  // 500 오류 응답
        }
    }

    @GetMapping("/checkemail")
    public ResponseEntity<Void> checkEmail(@RequestParam String email) {
        UserEntity existingUser = userRepository.findByEmail(email);

        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            return ResponseEntity.ok().build();
        }
    }
}
