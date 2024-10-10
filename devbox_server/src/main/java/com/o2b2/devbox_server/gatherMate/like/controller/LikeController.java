package com.o2b2.devbox_server.gatherMate.like.controller;

import com.o2b2.devbox_server.gatherMate.like.service.LikeService;
import com.o2b2.devbox_server.gatherMate.service.GatherMateService;
import com.o2b2.devbox_server.user.dto.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/gathermate/likes")
public class LikeController {

    private final LikeService likeService;
    private final GatherMateService gatherMateService;

    @PostMapping("/{postId}")
    public ResponseEntity<Map<String, Object>> toggleLike(@PathVariable Long postId,
                                                          @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getUserEntity().getId();
        boolean isLiked = likeService.toggleLike(userId, postId);
        int likeCount = gatherMateService.getLikeCount(postId);

        Map<String, Object> response = new HashMap<>();
        response.put("isLiked", isLiked);
        response.put("likeCount", likeCount);

        return ResponseEntity.ok(response);
    }
}