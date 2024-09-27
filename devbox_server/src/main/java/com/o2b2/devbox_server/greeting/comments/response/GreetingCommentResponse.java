package com.o2b2.devbox_server.greeting.comments.response;

import com.o2b2.devbox_server.greeting.comments.entity.GreetingComment;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Getter
public class GreetingCommentResponse {

    private Long id;
    private String content;
    private String authorName;
    private LocalDateTime createdAt;
    private boolean deleted;
    private List<GreetingCommentResponse> replies;

    @Builder
    public GreetingCommentResponse(Long id, String content, String authorName, LocalDateTime createdAt, boolean deleted, List<GreetingCommentResponse> replies) {
        this.id = id;
        this.content = content;
        this.authorName = authorName;
        this.createdAt = createdAt;
        this.deleted = deleted;
        this.replies = replies;
    }

    public static GreetingCommentResponse fromEntity(GreetingComment greetingComment) {

        if (greetingComment.isDeleted() && greetingComment.getReplies().isEmpty()) {
            // 삭제된 댓글이고 자식 댓글이 없으면 null 반환
            return null;
        }

        // 자식 댓글들을 재귀적으로 변환
        List<GreetingCommentResponse> replyResponses = greetingComment.getReplies().stream()
                .map(GreetingCommentResponse::fromEntity)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        return GreetingCommentResponse.builder()
                .id(greetingComment.getId())
                .content(greetingComment.getContent())
                .authorName(greetingComment.getUser().getNickname())
                .createdAt(greetingComment.getCreatedAt())
                .deleted(greetingComment.isDeleted()) // deleted 필드 설정
                .replies(greetingComment.getReplies().stream()
                        .map(GreetingCommentResponse::fromEntity)
                        .collect(Collectors.toList()))
                .build();
    }
}