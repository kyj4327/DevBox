package com.o2b2.devbox_server.gatherMate.entity;

import com.o2b2.devbox_server.gatherMate.domain.GatherMatePostEditor;
import com.o2b2.devbox_server.gatherMate.like.entity.Like;
import com.o2b2.devbox_server.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.*;
// import org.springframework.security.core.parameters.P;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PUBLIC) // 기본 생성자 롬북
public class GatherMate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String intro;
    private String apply;

    private String title;

    @Column(length = 500, nullable = false)
    private String content;

    private LocalDateTime createdAt;
    private boolean isRecruiting;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private String author;

    private int views;


    // 좋아요 개수
    @Setter
    private int likeCount;

    @Setter
    @OneToMany(mappedBy = "gatherMate", cascade = CascadeType.ALL)
    private List<Like> likes;

    public void incrementViewCount() {
        this.views = this.views + 1;
    }

    @Builder
    public GatherMate(String intro, String apply, String title, String content, UserEntity user,
                      LocalDateTime createdAt, boolean isRecruiting, String author, int likeCount, int views) {
        this.intro = intro;
        this.apply = apply;
        this.title = title;
        this.content = content;
        this.user = user;
        this.createdAt = createdAt;
        this.isRecruiting = isRecruiting;
        this.author = author;
        this.likeCount = likeCount;
        this.views = views;
    }

    public GatherMatePostEditor.GatherMatePostEditorBuilder toEditor(){
        return GatherMatePostEditor.builder()
                .intro(intro).apply(apply).title(title).content(content).isRecruiting(isRecruiting);
    }

//    public GatherMatePostEditor

    public void edit(GatherMatePostEditor gatherMatePostEditor) {
        this.intro = gatherMatePostEditor.getIntro();
        this.apply = gatherMatePostEditor.getApply();
        this.title = gatherMatePostEditor.getTitle();
        this.content = gatherMatePostEditor.getContent();
        this.isRecruiting = gatherMatePostEditor.isRecruiting();
    }
}
