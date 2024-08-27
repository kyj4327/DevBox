package com.o2b2.devbox_server.controller;

import com.o2b2.devbox_server.user.dto.CustomOAuth2User;
import com.o2b2.devbox_server.user.dto.UserDTO;
import com.o2b2.devbox_server.user.entity.UserEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@ResponseBody
public class MainController {

    @GetMapping("/")
    public String mainP() {

        return "Main Controller";
    }

    @GetMapping("/my")
    @ResponseBody
    public String myAPI() {

        return "my route";
    }

//    @GetMapping("/api/user/me")
//    public Map<String, Object> getCurrentUser(@AuthenticationPrincipal OAuth2User oauth2User) {
//        Map<String, Object> userInfo = new HashMap<>();
//
//        if (oauth2User != null) {
//            userInfo.put("name", oauth2User.getAttribute("name"));
//            userInfo.put("email", oauth2User.getAttribute("email"));
//            userInfo.put("nickname", oauth2User.getAttribute("nickname"));
//        } else {
//            userInfo.put("error", "User is not authenticated");
//        }
//
//        return userInfo;
//    }
//}

//    // 유저 정보 조회
//    @GetMapping("/api/user/me")
//    public ResponseEntity<UserDTO> getCurrentUser(@AuthenticationPrincipal UserEntity userEntity) {
//        if (userEntity != null) {
//            UserDTO userDTO = new UserDTO(userEntity.getEmail(),userEntity.getName(),userEntity.getRole(), userEntity.getNickname());
//            return ResponseEntity.ok(userDTO);
//        } else {
//            return ResponseEntity.badRequest().build();
//        }
//    }
}
