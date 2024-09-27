package com.o2b2.devbox_server.reference.model;

import com.o2b2.devbox_server.user.entity.UserEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Reference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String title;

    String selectJob;

    String content1;

    String content2;

    String content3;

    String content4;

    String content5;

    String link;

    @ManyToOne
    @JoinColumn(name = "user_id")
    UserEntity userEntity;
}
