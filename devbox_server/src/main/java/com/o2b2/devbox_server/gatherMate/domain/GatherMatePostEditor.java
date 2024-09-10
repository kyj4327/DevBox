package com.o2b2.devbox_server.gatherMate.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class GatherMatePostEditor {

    // 수정할 수 있는 필드만 선언 -> 변경 사항 한 곳에서 관리
    // 게시글 엔티티의 객체는 변경않고 PostEditor 로만 수정

    private final String intro;
    private final String apply;


    private final  String title; // 기본 값 = Null
    private final  String  content; // 기본 값 = Null
    private final boolean isRecruiting;

    @Builder
    public GatherMatePostEditor(String content, String title, String intro, String apply, boolean isRecruiting) {

        this.intro = intro;
        this.apply = apply;
        
        this.content = content;
        this.title = title;
        this.isRecruiting = isRecruiting;
    }
}
