package com.o2b2.devbox_server.greeting.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class GreetingPostEditor {

    private final  String  content; // 기본 값 = Null

    @Builder
    public GreetingPostEditor(String content) {
        this.content = content;
    }
}
