package com.o2b2.devbox_server.greeting.comments.entity;

import com.o2b2.devbox_server.greeting.comments.domain.GreetingCommentEditor;
import com.o2b2.devbox_server.greeting.entity.Greeting;
import com.o2b2.devbox_server.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GreetingComment {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    // 작성 시간
    private LocalDateTime createdAt;

    // 작성자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    // 게시글과의 연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "greeting_id")
    private Greeting greeting;

    // 부모 댓글 (null이면 최상위 댓글)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private GreetingComment parent;

    // 답글 리스트
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GreetingComment> replies = new ArrayList<>();

    @Getter
    @Setter
    private boolean deleted = false;


    @Builder
    public GreetingComment(String content, UserEntity user, Greeting greeting, GreetingComment parent, LocalDateTime createdAt) {
        this.content = content;
        this.createdAt = LocalDateTime.now();
        this.user = user;
        this.greeting = greeting;
        this.parent = parent;
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    public GreetingCommentEditor.GreetingCommentEditorBuilder toEditor() {
        return GreetingCommentEditor.builder()
                .content(this.content);
    }

    public void edit(GreetingCommentEditor greetingCommentEditor) {
        this.content = greetingCommentEditor.getContent();
    }

}
