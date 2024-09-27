package com.o2b2.devbox_server.freeboard.service;

import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.o2b2.devbox_server.freeboard.entity.Post;
import com.o2b2.devbox_server.freeboard.repository.PostRepository;
import com.o2b2.devbox_server.user.entity.UserEntity;
import com.o2b2.devbox_server.user.repository.UserRepository;

@Service
public class PostService {
    private static final Logger logger = LoggerFactory.getLogger(PostService.class);

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Post> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        System.out.println("Fetched posts: " + posts); // 로깅 추가
        return posts;
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public Post createPost(Post post, Long userId) {
        logger.info("Creating post for user ID: {}", userId);
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        post.setUser(user);
        post.setCreatedAt(LocalDateTime.now());
        Post savedPost = postRepository.save(post);
        logger.info("Post created successfully with ID: {}", savedPost.getId());
        return savedPost;
    }

    public Post updatePost(Long postId, Post postDetails) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // 제목과 내용만 업데이트
        if (postDetails.getTitle() != null) {
            post.setTitle(postDetails.getTitle());
        }
        if (postDetails.getContent() != null) {
            post.setContent(postDetails.getContent());
        }

        // 작성일 업데이트 (선택사항)
        post.setCreatedAt(LocalDateTime.now());

        return postRepository.save(post);
    }

    public void deletePost(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        postRepository.delete(post);
    }
}