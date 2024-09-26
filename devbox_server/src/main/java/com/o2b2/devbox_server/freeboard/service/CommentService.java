package com.o2b2.devbox_server.freeboard.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.o2b2.devbox_server.exception.ResourceNotFoundException;
import com.o2b2.devbox_server.freeboard.DTO.CommentsDTO;
import com.o2b2.devbox_server.freeboard.entity.Comment;
import com.o2b2.devbox_server.freeboard.entity.Post;
import com.o2b2.devbox_server.freeboard.repository.CommentRepository;
import com.o2b2.devbox_server.freeboard.repository.PostRepository;
import com.o2b2.devbox_server.user.entity.UserEntity;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    // public List<Comment> getCommentsByPostId(Long postId) {
    //     return commentRepository.findByPostId(postId);
    // }

    @Transactional
    public Comment createComment(Long postId, Comment comment, long userId) {
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));
        comment.setPost(post);
        UserEntity user = new UserEntity();
        user.setId(userId);
        comment.setUser(user);
        comment.setCreatedAt(LocalDateTime.now());
        return commentRepository.save(comment);
    }

    @Transactional
    public void deleteComment(Long id) {
        Comment comment = commentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + id));
        commentRepository.delete(comment);
    }

    //dto추가

    public CommentsDTO convertToDTO(Comment comment) {
        CommentsDTO dto = new CommentsDTO();
        dto.setId(comment.getId());
        dto.setContent(comment.getContent());
        dto.setUserId(comment.getUser().getId());
        dto.setPostId(comment.getPost().getId());
        dto.setCreatedAt(comment.getCreatedAt());
        return dto;
    }

    public List<CommentsDTO> getCommentsByPostId(Long postId) {
        List<Comment> comments = commentRepository.findByPostId(postId);
        return comments.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
}