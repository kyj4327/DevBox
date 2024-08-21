package com.o2b2.devbox_server.member.entity;

import jakarta.persistence.*;

@Entity
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String roleName;
    // 일반회원, (학생) - 웹개발자, 데브옵스, 클라우드, 데이터, 모바일,(관리자)
    // USER,   WEB_DEV, DEVOPS, CLOUD, DATA, MOBILE, ADMIN
}