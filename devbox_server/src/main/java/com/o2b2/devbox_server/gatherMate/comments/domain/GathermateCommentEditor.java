package com.o2b2.devbox_server.gatherMate.comments.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class GathermateCommentEditor {

    private final String content;

    @Builder
    public GathermateCommentEditor(String content) {
        this.content = content;
    }
}
