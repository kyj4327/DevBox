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
public class GatherMatePostCreate {

    private String intro;
    private String apply;

    @NotBlank(message = "타이틀을 입력해주세요.")
    private String title;


    @NotBlank(message = "내용을 입력해주세요.") // 빈값이 넘어오면 에러를 발생시켜준다.
    private String content;

    private LocalDateTime createdAt;
    private boolean isRecruiting;

    private Long userId;

    @Builder
    public GatherMatePostCreate(String intro,String apply, String title, String content, LocalDateTime createdAt, boolean isRecruiting,Long userId) {
        this.intro = intro;
        this.apply = apply;
        this.title = title;
        this.content = content;
        this.isRecruiting = isRecruiting;
        this.createdAt = createdAt;
        this.userId = userId;
    }
}

