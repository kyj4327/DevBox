package com.o2b2.devbox_server.greeting.comments.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class GreetingCommentEditor {

    private final String content;

    @Builder
    public GreetingCommentEditor(String content) {
        this.content = content;
    }
}
