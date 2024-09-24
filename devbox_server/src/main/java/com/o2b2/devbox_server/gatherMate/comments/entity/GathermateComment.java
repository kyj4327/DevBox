package com.o2b2.devbox_server.gatherMate.comments.entity;

import com.o2b2.devbox_server.gatherMate.comments.domain.GathermateCommentEditor;
import com.o2b2.devbox_server.gatherMate.entity.GatherMate;
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
public class GathermateComment {

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
    @JoinColumn(name = "gather_mate_id")
    private GatherMate gatherMate;

    // 부모 댓글 (null이면 최상위 댓글)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private GathermateComment parent;

    // 답글 리스트
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GathermateComment> replies = new ArrayList<>();

    @Getter
    @Setter
    private boolean deleted = false;


    @Builder
    public GathermateComment(String content, UserEntity user, GatherMate gatherMate, GathermateComment parent, LocalDateTime createdAt) {
        this.content = content;
        this.createdAt = LocalDateTime.now();
        this.user = user;
        this.gatherMate = gatherMate;
        this.parent = parent;
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }

    public GathermateCommentEditor.GathermateCommentEditorBuilder toEditor() {
        return GathermateCommentEditor.builder()
                .content(this.content);
    }

    public void edit(GathermateCommentEditor gathermateCommentEditor) {
        this.content = gathermateCommentEditor.getContent();
    }

}
