package com.o2b2.devbox_server.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.o2b2.devbox_server.entity.Comments;

public interface CommentRepository extends JpaRepository<Comments, Long> {
    List<Comments> findByPostId(Long postId);
}
