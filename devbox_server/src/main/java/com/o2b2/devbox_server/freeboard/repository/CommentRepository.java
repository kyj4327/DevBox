package com.o2b2.devbox_server.freeboard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.o2b2.devbox_server.freeboard.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostId(Long postId);
    long countByPostId(Long postId);
}
