package com.o2b2.devbox_server.service;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.o2b2.devbox_server.entity.Post;
import com.o2b2.devbox_server.repository.PostRepository;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public List<Post> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        System.out.println("Fetched posts: " + posts);  // 로깅 추가
        return posts;
    }
    public Post getPostById(Long id) {
        return postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public Post createPost(Post post) {
        post.setCreatedAt(LocalDateTime.now());
        return postRepository.save(post);
    }

    public Post updatePost(Long postId, Post postDetails) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        post.setTitle(postDetails.getTitle());
        post.setContent(postDetails.getContent());
        post.setAuthor(postDetails.getAuthor());
        return postRepository.save(post);
    }

    public void deletePost(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        postRepository.delete(post);
    }
}