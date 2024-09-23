package com.o2b2.devbox_server.gatherMate.comments.controller;

import com.o2b2.devbox_server.gatherMate.comments.request.GathermateCommentCreate;
import com.o2b2.devbox_server.gatherMate.comments.response.GathermateCommentResponse;
import com.o2b2.devbox_server.gatherMate.comments.service.GathermateCommentService;
import com.o2b2.devbox_server.user.dto.CustomUserDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class GathermateCommentController {

    private final GathermateCommentService gathermateCommentService;

    @PostMapping("/gathermate/{postId}/comments")
    public void write(@PathVariable Long postId, @RequestBody @Valid GathermateCommentCreate request,
                      @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getUserEntity().getId();
        gathermateCommentService.write(postId, userId, request);
    }

    @GetMapping("/gathermate/{postId}/commentslist")
    public List<GathermateCommentResponse> getComments(@PathVariable Long postId) {
        return gathermateCommentService.getCommentsByPost(postId);
    }
}
