package com.o2b2.devbox_server.greeting.comments.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GreetingCommentEdit {
    private String content;

    @Builder
    public GreetingCommentEdit(String content) {
        this.content = content;
    }
}
