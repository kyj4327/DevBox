package com.o2b2.devbox_server.gatherMate.comments.controller;

import com.o2b2.devbox_server.gatherMate.comments.request.GathermateCommentCreate;
import com.o2b2.devbox_server.gatherMate.comments.request.GathermateCommentEdit;
import com.o2b2.devbox_server.gatherMate.comments.response.GathermateCommentResponse;
import com.o2b2.devbox_server.gatherMate.comments.service.GathermateCommentService;
import com.o2b2.devbox_server.user.dto.CustomUserDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class GathermateCommentController {

    private final GathermateCommentService gathermateCommentService;

    // 댓글 생성
    @PostMapping("/gathermate/{postId}/comments")
    public void write(@PathVariable Long postId, @RequestBody @Valid GathermateCommentCreate request,
                      @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getUserEntity().getId();
        gathermateCommentService.write(postId, userId, request);
    }

    // 댓글 조회
    @GetMapping("/gathermate/{postId}/commentslist")
    public List<GathermateCommentResponse> getComments(@PathVariable Long postId) {
        return gathermateCommentService.getCommentsByPost(postId);
    }

    // 댓글 수정
    @PutMapping("/gathermate/comments/{commentId}/edit")
    public ResponseEntity<Map<String, String>> editComment(@PathVariable Long commentId,
                                                           @RequestBody @Valid GathermateCommentEdit request,
                                                           @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getUserEntity().getId();

        gathermateCommentService.editComment(commentId, userId, request);

        Map<String, String> response = new HashMap<>();
        response.put("message", "댓글이 수정되었습니다.");

        return ResponseEntity.ok(response);
    }

    // 댓글 삭제
    @DeleteMapping("/gathermate/comments/{commentId}/delete")
    public ResponseEntity<Map<String, String>> deleteComment(@PathVariable Long commentId,
                                                             @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getUserEntity().getId();

        gathermateCommentService.deleteComment(commentId, userId);

        Map<String, String> response = new HashMap<>();
        response.put("message", "댓글이 삭제되었습니다.");

        return ResponseEntity.ok(response);
    }
}

