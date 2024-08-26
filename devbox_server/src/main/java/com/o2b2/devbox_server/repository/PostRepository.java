package com.o2b2.devbox_server.repository;

import com.o2b2.devbox_server.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
