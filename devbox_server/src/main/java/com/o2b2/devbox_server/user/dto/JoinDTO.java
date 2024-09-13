package com.o2b2.devbox_server.user.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class JoinDTO {

    private String email;
    private String password;

    private String name;
    private String nickname;

    private String role;

    private String field;

}
