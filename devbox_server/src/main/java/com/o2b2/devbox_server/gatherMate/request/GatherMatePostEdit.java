package com.o2b2.devbox_server.gatherMate.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Setter
@Getter
@ToString
public class GatherMatePostEdit {

    // 기능이 다르면 안에 코드가 비슷하더라도 명확하게 분리해주고 시작하는 것 좋다.

    private String intro;
    private String apply;

    @NotBlank(message = "타이틀을 입력해주세요.")
    private String title;

    @NotBlank(message = "내용을 입력해주세요.") // 빈값이 넘어오면 에러를 발생시켜준다.
    private String content;

//    private LocalDateTime createdAt;
    private boolean isRecruiting;

    @Builder
    public GatherMatePostEdit(String intro, String apply, String title, String content, boolean isRecruiting) {
        this.intro = intro;
        this.apply = apply;
        this.title = title;
        this.content = content;
        this.isRecruiting = isRecruiting;
    }
}

