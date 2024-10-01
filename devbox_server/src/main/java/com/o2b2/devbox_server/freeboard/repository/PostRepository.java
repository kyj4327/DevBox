// src/main/java/com/example/demo/repository/PostRepository.java
package com.o2b2.devbox_server.freeboard.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.o2b2.devbox_server.freeboard.entity.Post;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserId(Long userId); // 사용자 ID로 게시글 찾기
    long countByUserId(Long userId);
}
