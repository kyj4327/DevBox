package com.o2b2.devbox_server.user.entity;

import java.util.ArrayList;
import java.util.List;

import com.o2b2.devbox_server.message.model.MsgEntity;
import com.o2b2.devbox_server.project.model.ProEntity;

import jakarta.persistence.*;
import lombok.Data;

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

    // oAuth2에서 추가 되는 정보
    private String provider; // google, naver, kakao 인지 어느 소셜 로그인했는지
    private String providerId;// sub=101926511570168785716

//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "role_id", nullable = false)
//    private Role role;
    private String role;

    private String field;

    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.REMOVE)
    List<ProEntity> proEntitys = new ArrayList<>();
    
    @OneToMany(mappedBy = "userEntity")
    List<MsgEntity> MsgEntitys = new ArrayList<>();

}