package com.o2b2.devbox_server.gatherMate.comments.response;

import com.o2b2.devbox_server.gatherMate.comments.entity.GathermateComment;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Getter
public class GathermateCommentResponse {

    private Long id;
    private String content;
    private String authorName;
    private LocalDateTime createdAt;
    private boolean deleted;
    private List<GathermateCommentResponse> replies;

    @Builder
    public GathermateCommentResponse(Long id, String content, String authorName, LocalDateTime createdAt, boolean deleted, List<GathermateCommentResponse> replies) {
        this.id = id;
        this.content = content;
        this.authorName = authorName;
        this.createdAt = createdAt;
        this.deleted = deleted;
        this.replies = replies;
    }

    public static GathermateCommentResponse fromEntity(GathermateComment gathermateComment) {

        if (gathermateComment.isDeleted() && gathermateComment.getReplies().isEmpty()) {
            // 삭제된 댓글이고 자식 댓글이 없으면 null 반환
            return null;
        }

        // 자식 댓글들을 재귀적으로 변환
        List<GathermateCommentResponse> replyResponses = gathermateComment.getReplies().stream()
                .map(GathermateCommentResponse::fromEntity)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        return GathermateCommentResponse.builder()
                .id(gathermateComment.getId())
                .content(gathermateComment.getContent())
                .authorName(gathermateComment.getUser().getNickname())
                .createdAt(gathermateComment.getCreatedAt())
                .deleted(gathermateComment.isDeleted()) // deleted 필드 설정
                .replies(gathermateComment.getReplies().stream()
                        .map(GathermateCommentResponse::fromEntity)
                        .collect(Collectors.toList()))
                .build();
    }
}