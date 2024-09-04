package com.o2b2.devbox_server.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.o2b2.devbox_server.entity.Comment;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostId(Long postId);
}