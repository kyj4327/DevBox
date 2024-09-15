package com.o2b2.devbox_server.gatherMate.response;

import com.o2b2.devbox_server.gatherMate.entity.GatherMate;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class GatherMateResponse {

    /*
    final 선언 필드 -> Setter 메서드를 제공할 수 없다 => 객체의 필드를 한 번만 설정할 수 있는 불변 객체 설계
     */
    private final Long id;
    private final String intro;
    private final String apply;
    private final String title;
    private final String content;
    private final LocalDateTime createdAt;
    private final boolean isRecruiting;

    private final String author;

    private int likeCount;
    private boolean isLiked;



    // 생성자 오버로딩
    public GatherMateResponse(GatherMate gatherMate) {
        this.id = gatherMate.getId();
        this.intro = gatherMate.getIntro();
        this.apply = gatherMate.getApply();
        this.title = gatherMate.getTitle();
        this.content = gatherMate.getContent();
        this.createdAt = gatherMate.getCreatedAt();
        this.isRecruiting = gatherMate.isRecruiting();
        this.author = gatherMate.getUser().getNickname();
        this.likeCount = gatherMate.getLikeCount();
    }

    @Builder
    public GatherMateResponse(Long id, String intro, String apply, String title, String content,
                              LocalDateTime createdAt, boolean isRecruiting, String author,
                              int likeCount, boolean isLiked) {
        this.id = id;
        this.intro = intro;
        this.apply = apply;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.isRecruiting = isRecruiting;
        this.author = author;
        this.likeCount = likeCount;
        this.isLiked = isLiked;
    }
}
