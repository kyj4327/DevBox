package com.o2b2.devbox_server.freeboard.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentsDTO {
    private Long id; // Comment ID
    private String content; // 댓글 내용
    private Long userId; // 작성자의 User ID
    private Long postId; // 댓글이 속한 게시글 ID
    private LocalDateTime createdAt; // 작성 시간
    private String userNickname;
}
