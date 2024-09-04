package com.o2b2.devbox_server.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.o2b2.devbox_server.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
}