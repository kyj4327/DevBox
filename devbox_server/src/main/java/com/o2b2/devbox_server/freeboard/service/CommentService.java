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
    // return commentRepository.findByPostId(postId);
    // }

    @Transactional
    public Comment createComment(Long postId, Comment comment, long userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        UserEntity user = new UserEntity();
        user.setId(userId);
        // Post와 User 설정
        comment.setPost(post);
        comment.setUser(user); // 댓글 작성자 정보는 여전히 User와 연관 // author 필드 설정

        comment.setCreatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    @Transactional
    public void deleteComment(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + id));
        commentRepository.delete(comment);
    }

    @Transactional
    public Comment editComment(Long id, Comment updatedComment, Long userId) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + id));

        // 댓글 작성자와 현재 사용자가 같은지 확인
        if (!comment.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("You are not authorized to edit this comment");
        }

        comment.setContent(updatedComment.getContent());
        // comment.setUpdatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    // dto추가

    public CommentsDTO convertToDTO(Comment comment) {
        CommentsDTO dto = new CommentsDTO();
        dto.setId(comment.getId());
        dto.setContent(comment.getContent());
        dto.setUserId(comment.getUser().getId());
        dto.setPostId(comment.getPost().getId());
        dto.setCreatedAt(comment.getCreatedAt());
        dto.setAuthor(comment.getAuthor());
        return dto;
    }

    public List<CommentsDTO> getCommentsByPostId(Long postId) {
        List<Comment> comments = commentRepository.findByPostId(postId);
        return comments.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
}