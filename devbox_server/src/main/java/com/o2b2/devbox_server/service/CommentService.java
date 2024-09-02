package com.o2b2.devbox_server.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.o2b2.devbox_server.entity.Comments;
import com.o2b2.devbox_server.repository.CommentRepository;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comments> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    public Comments saveComment(Comments comment) {
        return commentRepository.save(comment);
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}
    