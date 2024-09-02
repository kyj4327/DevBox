package com.o2b2.devbox_server.message.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;


@Entity
@Data
public class MsgEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String content;

    String title;

    String sender;

    String reciver;

    LocalDateTime sendTime = LocalDateTime.now();

    LocalDateTime readTime;

    Boolean like;


}
