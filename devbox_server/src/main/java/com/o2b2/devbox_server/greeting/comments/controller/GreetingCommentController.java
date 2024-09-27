package com.o2b2.devbox_server.greeting.comments.controller;

import com.o2b2.devbox_server.greeting.comments.request.GreetingCommentCreate;
import com.o2b2.devbox_server.greeting.comments.request.GreetingCommentEdit;
import com.o2b2.devbox_server.greeting.comments.response.GreetingCommentResponse;
import com.o2b2.devbox_server.greeting.comments.service.GreetingCommentService;
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
public class GreetingCommentController {

    private final GreetingCommentService greetingCommentService;

    // 댓글 생성
    @PostMapping("/greeting/{postId}/comments")
    public void write(@PathVariable Long postId, @RequestBody @Valid GreetingCommentCreate request,
                      @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getUserEntity().getId();
        greetingCommentService.write(postId, userId, request);
    }

    // 댓글 조회
    @GetMapping("/greeting/{postId}/commentslist")
    public List<GreetingCommentResponse> getComments(@PathVariable Long postId) {
        return greetingCommentService.getCommentsByPost(postId);
    }

    // 댓글 수정
    @PutMapping("/greeting/comments/{commentId}/edit")
    public ResponseEntity<Map<String, String>> editComment(@PathVariable Long commentId,
                                                           @RequestBody @Valid GreetingCommentEdit request,
                                                           @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getUserEntity().getId();

        greetingCommentService.editComment(commentId, userId, request);

        Map<String, String> response = new HashMap<>();
        response.put("message", "댓글이 수정되었습니다.");

        return ResponseEntity.ok(response);
    }

    // 댓글 삭제
    @DeleteMapping("/greeting/comments/{commentId}/delete")
    public ResponseEntity<Map<String, String>> deleteComment(@PathVariable Long commentId,
                                                             @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getUserEntity().getId();

        greetingCommentService.deleteComment(commentId, userId);

        Map<String, String> response = new HashMap<>();
        response.put("message", "댓글이 삭제되었습니다.");

        return ResponseEntity.ok(response);
    }
}

