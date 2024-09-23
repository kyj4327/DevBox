package com.o2b2.devbox_server.gatherMate.comments.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GathermateCommentCreate {

    private String content;   // 댓글 내용
    private Long parentId;    // 부모 댓글 ID (답글인 경우)

    @Builder
    public GathermateCommentCreate(String content, Long parentId) {
        this.content = content;
        this.parentId = parentId;
    }
}