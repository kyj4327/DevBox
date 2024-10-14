package com.o2b2.devbox_server.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UpdateUserInfoDTO {

    @Size(min = 3, max = 20, message = "닉네임은 3자 이상 20자 이하이어야 합니다.")
    private String nickname;

    @NotBlank(message = "이름은 필수 입력 사항입니다.")
    private String name;

    private String role;

    private String field;
}
