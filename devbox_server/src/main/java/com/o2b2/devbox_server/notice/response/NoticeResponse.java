package com.o2b2.devbox_server.notice.response;

import com.o2b2.devbox_server.gatherMate.entity.GatherMate;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class NoticeResponse {

    /*
    final 선언 필드 -> Setter 메서드를 제공할 수 없다 => 객체의 필드를 한 번만 설정할 수 있는 불변 객체 설계
     */
    private final Long id;

    private final String title;
    private final String content;
    private final LocalDateTime createdAt;
    private final String author;

    private int views;


    // 생성자 오버로딩
    public NoticeResponse(GatherMate gatherMate ) {
        this.id = gatherMate.getId();
        this.title = gatherMate.getTitle();
        this.content = gatherMate.getContent();
        this.createdAt = gatherMate.getCreatedAt();
        this.author = gatherMate.getUser().getNickname();

        this.views = gatherMate.getViews();
    }

    @Builder
    public NoticeResponse(Long id, String title, String content,
                          LocalDateTime createdAt, String author,
                          int views) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.author = author;
        this.views = views;
    }
}
