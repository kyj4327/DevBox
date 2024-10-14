package com.o2b2.devbox_server.freeboard.DTO;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostDTO {
    private Long id; // Post ID
    private String title; // Post 제목
    private String content; // Post 내용
    private Long userId; // 작성자의 User ID
    private LocalDateTime createdAt; // 작성 시간
    private String authorNickname;
    private int views; // 조회수 필드 추가
    private long commentCount; // 댓글 수 필드 추가
    private long postCount; // 사용자가 작성한 게시글 개수

}
