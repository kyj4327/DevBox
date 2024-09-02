package com.o2b2.devbox_server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.o2b2.devbox_server.entity.Comments;
import com.o2b2.devbox_server.service.CommentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Comments>> getCommentsByPostId(@PathVariable Long postId) {
        List<Comments> comments = commentService.getCommentsByPostId(postId);
        return ResponseEntity.ok(comments);
    }

    @PostMapping
    public ResponseEntity<Comments> createComment(@RequestBody Comments comment) {
        Comments createdComment = commentService.saveComment(comment);
        return ResponseEntity.ok(createdComment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }
}
