package com.o2b2.devbox_server.freeboard.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.o2b2.devbox_server.freeboard.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
}