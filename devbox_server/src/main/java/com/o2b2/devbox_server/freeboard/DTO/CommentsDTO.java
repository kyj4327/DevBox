package com.o2b2.devbox_server.freeboard.DTO;

import com.o2b2.devbox_server.freeboard.entity.Post;
import com.o2b2.devbox_server.user.entity.UserEntity;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.ObjectIdGenerators.StringIdGenerator;
import com.o2b2.devbox_server.freeboard.entity.Comment;

@Getter
@Setter
public class CommentsDTO {
    private Long id; // Comment ID
    private String content; // 댓글 내용
    private Long userId; // 작성자의 User ID
    private Long postId; // 댓글이 속한 게시글 ID
    private LocalDateTime createdAt; // 작성 시간
    private String author;
}
