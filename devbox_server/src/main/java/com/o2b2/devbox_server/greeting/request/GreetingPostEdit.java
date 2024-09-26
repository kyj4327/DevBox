package com.o2b2.devbox_server.greeting.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class GreetingPostEdit {


    @NotBlank(message = "내용을 입력해주세요.") // 빈값이 넘어오면 에러를 발생시켜준다.
    private String content;

    @Builder
    public GreetingPostEdit(String content) {
        this.content = content;
    }
}

