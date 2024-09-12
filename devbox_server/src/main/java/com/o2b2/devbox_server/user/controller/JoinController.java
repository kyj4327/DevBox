package com.o2b2.devbox_server.user.controller;

import com.o2b2.devbox_server.user.dto.JoinDTO;
import com.o2b2.devbox_server.user.service.JoinService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
public class JoinController {

    private final JoinService joinService;

    public JoinController(JoinService joinService) {

        this.joinService = joinService;
    }

//    @PostMapping("/join")
//    public ResponseEntity<String> join(@RequestBody JoinDTO joinDTO) {  // JSON 데이터를 받아옴
//        joinService.joinProcess(joinDTO);
//        return ResponseEntity.ok("회원가입이 성공적으로 완료되었습니다.");
//    }

    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody JoinDTO joinDTO) {
        try {
            joinService.joinProcess(joinDTO);
            return ResponseEntity.ok("DevBox에 오신것을 환영합니다!");  // 200 OK 응답
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입에 실패했습니다.");  // 500 오류 응답
        }
    }
}
