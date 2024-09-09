package com.o2b2.devbox_server.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.o2b2.devbox_server.entity.Comment;
import com.o2b2.devbox_server.entity.Post;
import com.o2b2.devbox_server.repository.CommentRepository;
import com.o2b2.devbox_server.repository.PostRepository;
import com.o2b2.devbox_server.exception.ResourceNotFoundException;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    @Transactional
    public Comment createComment(Long postId, Comment comment) {
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));
        comment.setPost(post);
        comment.setCreatedAt(LocalDateTime.now());
        return commentRepository.save(comment);
    }

    @Transactional
    public void deleteComment(Long id) {
        Comment comment = commentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + id));
        commentRepository.delete(comment);
    }
}