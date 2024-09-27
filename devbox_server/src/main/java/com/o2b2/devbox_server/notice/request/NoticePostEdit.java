package com.o2b2.devbox_server.notice.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class NoticePostEdit {


    @NotBlank(message = "타이틀을 입력해주세요.")
    private String title;

    @NotBlank(message = "내용을 입력해주세요.") // 빈값이 넘어오면 에러를 발생시켜준다.
    private String content;

    @Builder
    public NoticePostEdit(String title, String content) {

        this.title = title;
        this.content = content;
    }
}

