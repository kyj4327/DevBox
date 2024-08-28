package com.o2b2.devbox_server.controller;

import com.o2b2.devbox_server.user.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@ResponseBody
public class MainController {


    private final UserRepository userRepository;

    public MainController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @GetMapping("/")
    public String mainP() {

        return "Main Controller";
    }

    @GetMapping("/my")
    @ResponseBody
    public String myAPI() {

        return "my route";
    }

    @GetMapping("/api/user/me")
    public Map<String, Object> getCurrentUser(Authentication authentication) {
        Map<String, Object> userInfo = new HashMap<>();
        if (authentication != null && authentication.isAuthenticated()) {
            // authentication에서 사용자 정보 추출
            // userInfo에 정보 추가
        } else {
            userInfo.put("error", "User is not authenticated");
        }
        return userInfo;
    }

}

