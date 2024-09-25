package com.o2b2.devbox_server.notice.entity;

import com.o2b2.devbox_server.notice.domain.NoticePostEditor;
import com.o2b2.devbox_server.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PUBLIC) // 기본 생성자 롬북
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 500, nullable = false)
    private String content;

    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private String author;

    private int views;


    public void incrementViews() {
        this.views++;
    }

    @Builder
    public Notice(String title, String content, UserEntity user,
                  LocalDateTime createdAt, String author, int views) {

        this.title = title;
        this.content = content;
        this.user = user;
        this.createdAt = createdAt;
        this.author = author;
        this.views = views;
    }

    public NoticePostEditor.NoticePostEditorBuilder toEditor(){
        return NoticePostEditor.builder()
                .title(title).content(content);
    }

    public void edit(NoticePostEditor noticePostEditor) {
        this.title = noticePostEditor.getTitle();
        this.content = noticePostEditor.getContent();
    }
}
