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

}
