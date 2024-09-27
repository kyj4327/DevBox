package com.o2b2.devbox_server.greeting.comments.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GreetingCommentCreate {

    private String content;   // 댓글 내용
    private Long parentId;    // 부모 댓글 ID (답글인 경우)

    @Builder
    public GreetingCommentCreate(String content, Long parentId) {
        this.content = content;
        this.parentId = parentId;
    }
}