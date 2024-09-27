package com.o2b2.devbox_server.freeboard.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.o2b2.devbox_server.exception.ResourceNotFoundException;
import com.o2b2.devbox_server.freeboard.DTO.CommentsDTO;
import com.o2b2.devbox_server.freeboard.entity.Comment;
import com.o2b2.devbox_server.freeboard.service.CommentService;
import com.o2b2.devbox_server.user.dto.CustomUserDetails;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentsDTO>> getCommentsByPostId(@PathVariable Long postId) {
        List<CommentsDTO> comments = commentService.getCommentsByPostId(postId);
        return ResponseEntity.ok(comments);
    }

    @PostMapping("/post/write/{postId}")
    public ResponseEntity<CommentsDTO> createComment(@PathVariable Long postId, @RequestBody Comment comment,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getUserEntity().getId();
        Comment createdComment = commentService.createComment(postId, comment, userId);
        CommentsDTO commentDTO = commentService.convertToDTO(createdComment);
        return ResponseEntity.ok(commentDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id) {
        try {
            commentService.deleteComment(id);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}