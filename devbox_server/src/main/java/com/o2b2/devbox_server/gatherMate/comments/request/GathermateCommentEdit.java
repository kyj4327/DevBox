package com.o2b2.devbox_server.gatherMate.comments.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GathermateCommentEdit {
    private String content;

    @Builder
    public GathermateCommentEdit(String content) {
        this.content = content;
    }
}
