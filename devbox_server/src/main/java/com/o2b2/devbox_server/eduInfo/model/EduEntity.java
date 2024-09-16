package com.o2b2.devbox_server.eduInfo.model;

import com.o2b2.devbox_server.user.entity.UserEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class EduEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String title;

    // 진행 회사 로고 이미지
    String logo;

    String subtitle;

    String img;

    String recruit;

    String eduterm;

    String people;

    String link;

    String state;

    @ManyToOne
    UserEntity userEntity;

}
