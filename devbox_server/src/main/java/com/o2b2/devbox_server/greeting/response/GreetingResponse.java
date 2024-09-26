package com.o2b2.devbox_server.greeting.response;

import com.o2b2.devbox_server.greeting.entity.Greeting;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class GreetingResponse {

    /*
    final 선언 필드 -> Setter 메서드를 제공할 수 없다 => 객체의 필드를 한 번만 설정할 수 있는 불변 객체 설계
     */
    private final Long id;
    private final String content;
    private final LocalDateTime createdAt;

    private final String author;


    // 댓글의 수
    private int commentCount;

    // 생성자 오버로딩
    public GreetingResponse(Greeting greeting, int commentCount) {
        this.id = greeting.getId();

        this.content = greeting.getContent();
        this.createdAt = greeting.getCreatedAt();
        this.author = greeting.getUser().getNickname();
        this.commentCount = commentCount;
    }

    @Builder
    public GreetingResponse(Long id, String content,
                            LocalDateTime createdAt, String author,
                            int commentCount) {
        this.id = id;

        this.content = content;
        this.createdAt = createdAt;
        this.author = author;
        this.commentCount = commentCount;
    }
}
