package com.o2b2.devbox_server.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {

    private String email;
    private String role;
    private String name;
    private String username;
    private String nickname;
    private String field;
    private String provider; // google, naver, kakao 인지 어느 소셜 로그인했는지
    private String providerId; // 소셜 자체 id

//    public UserDTO(String email,String name, String role, String nickname) {
//    }

//    public UserDTO(String email, String name,String role, String nickname) {
//        this.email = email;
//        this.role = role;
//        this.name = name;
//        this.username = username;
//        this.nickname = nickname;
//    }
}
