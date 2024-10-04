package com.o2b2.devbox_server.user.dto;

import com.o2b2.devbox_server.user.entity.UserEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO {

    private String email;
    private String role;
    private String name;
    private String username;
    private String nickname;
    private String field;
    private String provider; // google, naver, kakao 인지 어느 소셜 로그인했는지
    private String providerId; // 소셜 자체 id

    public UserDTO(String nickname) {
        this.nickname = nickname;
    }

    public static UserDTO fromEntity(UserEntity ue) {
        return new UserDTO(
            ue.getNickname()
        );
    }
}
