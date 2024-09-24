package com.o2b2.devbox_server.message.model;

import lombok.Data;

import java.time.LocalDateTime;

import com.o2b2.devbox_server.user.entity.UserEntity;

@Data
public class MsgEntity {
    Long id;

    String content;

    String title;

    LocalDateTime sendTime = LocalDateTime.now();

    LocalDateTime readTime;

    Boolean like;

    Integer order;

    UserEntity sender;

    UserEntity receiver;
}
