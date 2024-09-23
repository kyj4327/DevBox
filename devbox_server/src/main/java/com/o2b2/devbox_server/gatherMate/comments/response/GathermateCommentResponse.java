package com.o2b2.devbox_server.gatherMate.comments.response;

import com.o2b2.devbox_server.gatherMate.comments.entity.GathermateComment;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class GathermateCommentResponse {

    private Long id;
    private String content;
    private String authorName;
    private LocalDateTime createdAt;
    private List<GathermateCommentResponse> replies;

    @Builder
    public GathermateCommentResponse(Long id, String content, String authorName, LocalDateTime createdAt, List<GathermateCommentResponse> replies) {
        this.id = id;
        this.content = content;
        this.authorName = authorName;
        this.createdAt = createdAt;
        this.replies = replies;
    }

    public static GathermateCommentResponse fromEntity(GathermateComment gathermateComment) {
        return GathermateCommentResponse.builder()
                .id(gathermateComment.getId())
                .content(gathermateComment.getContent())
                .authorName(gathermateComment.getUser().getNickname())
                .createdAt(gathermateComment.getCreatedAt())
                .replies(gathermateComment.getReplies().stream()
                        .map(GathermateCommentResponse::fromEntity)
                        .collect(Collectors.toList()))
                .build();
    }
}