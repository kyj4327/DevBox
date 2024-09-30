package com.o2b2.devbox_server.freeboard.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.o2b2.devbox_server.freeboard.DTO.PostDTO;
import com.o2b2.devbox_server.freeboard.entity.Post;
import com.o2b2.devbox_server.freeboard.service.PostService;
import com.o2b2.devbox_server.user.dto.CustomUserDetails;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    private static final Logger logger = LoggerFactory.getLogger(PostController.class);

    @Autowired
    private PostService postService;

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        Post post = postService.getPostById(id);
        return ResponseEntity.ok(post);
    }

    @PostMapping("/write")
    public ResponseEntity<?> createPost(@Valid @RequestBody Post post,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        // try {
        Long userId = userDetails.getUserEntity().getId();
        Post createdPost = postService.createPost(post, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
        // } catch (RuntimeException e) {
        // logger.error("Error creating post: ", e);
        // return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        // }
    }

    @PutMapping("/{postId}")
    public ResponseEntity<Post> updatePost(@PathVariable Long postId, @RequestBody Post postDetails) {
        Post updatedPost = postService.updatePost(postId, postDetails);
        return ResponseEntity.ok(updatedPost);
    }

    // 게시글 삭제
    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
        return ResponseEntity.ok().build();
    }

    // 사용자가 작성한 게시글 가져오기
    @GetMapping("/user/{userId}")
    public List<PostDTO> getUserPosts(@PathVariable Long userId) {
        return postService.getPostsByUserId(userId);
    }

    @GetMapping("/user/{userId}/count")
    public long getUserPostCount(@PathVariable Long userId) {
        return postService.getUserPostCount(userId);
    }
}
