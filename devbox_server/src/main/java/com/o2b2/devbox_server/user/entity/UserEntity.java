package com.o2b2.devbox_server.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.o2b2.devbox_server.gatherMate.comments.entity.GathermateComment;
import com.o2b2.devbox_server.freeboard.entity.Comment;
import com.o2b2.devbox_server.freeboard.entity.Post;
import com.o2b2.devbox_server.gatherMate.entity.GatherMate;
import com.o2b2.devbox_server.gatherMate.like.entity.Like;
import com.o2b2.devbox_server.greeting.comments.entity.GreetingComment;
import com.o2b2.devbox_server.greeting.entity.Greeting;
import com.o2b2.devbox_server.message.model.MsgReciverEntity;
import com.o2b2.devbox_server.message.model.MsgSenderEntity;
import com.o2b2.devbox_server.project.model.ProEntity;
import com.o2b2.devbox_server.project.model.ProLike;
import com.o2b2.devbox_server.reference.model.Reference;
import com.o2b2.devbox_server.reservation.model.Reservation;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    private String name;
    private String nickname;
    private String password;

    // 소셜 로그인 정보
    private String provider;
    private String providerId;

    private String role;
    private String field;

    // 자유게시판(Post)와의 연관관계 (양방향 매핑)
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Post> posts = new ArrayList<>();

    // 댓글(Comment)와의 연관관계 (양방향 매핑)
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Comment> comments = new ArrayList<>();

    // 프로젝트와의 연관관계
    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    List<ProEntity> proEntitys = new ArrayList<>();

    @OneToMany(mappedBy = "receiver")
    @JsonIgnore
    List<MsgReciverEntity> MsgEntitys = new ArrayList<>();

    @OneToMany(mappedBy = "sender")
    @JsonIgnore
    List<MsgSenderEntity> MsgSenderEntitys = new ArrayList<>();

    // 프로젝트 좋아요와의 연관관계
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<ProLike> proLikes = new ArrayList<>();

    // Reference와의 연관관계
    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    List<Reference> ReferenceLists = new ArrayList<>();

    // Reservation과의 연관관계
    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    List<Reservation> ReservationLists = new ArrayList<>();

    // 모여라메이트 좋아요
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Like> likes = new ArrayList<>();

    // 모여라메이트
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<GatherMate> gatherMates = new ArrayList<>();

    // 모여라메이트 댓글
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<GathermateComment> gathermateComments = new ArrayList<>();

    // 가입인사
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Greeting> greetings = new ArrayList<>();

    // 가입인사 댓글
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<GreetingComment> greetingComments = new ArrayList<>();

}

