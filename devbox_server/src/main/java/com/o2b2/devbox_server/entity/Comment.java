package com.o2b2.devbox_server.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Integer comment_id;
    private Integer post_id;
    private String content;
    private LocalDateTime created_at;
    private LocalDateTime update_at;
    private Integer author_id;
    

}
