package com.o2b2.devbox_server.greeting.entity;

import com.o2b2.devbox_server.greeting.comments.entity.GreetingComment;
import com.o2b2.devbox_server.greeting.domain.GreetingPostEditor;
import com.o2b2.devbox_server.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PUBLIC) // 기본 생성자 롬북
public class Greeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500, nullable = false)
    private String content;

    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private String author;

    private String field;


    @OneToMany(mappedBy = "greeting", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GreetingComment> greetingComments;

    @Builder
    public Greeting(String content, UserEntity user,
                    LocalDateTime createdAt, String author, String field) {

        this.content = content;
        this.user = user;
        this.createdAt = createdAt;
        this.author = author;
        this.field = field;
    }

    public GreetingPostEditor.GreetingPostEditorBuilder toEditor(){
        return GreetingPostEditor.builder()
                .content(content);
    }

    public void edit(GreetingPostEditor greetingPostEditor) {
        this.content = greetingPostEditor.getContent();
    }
}
