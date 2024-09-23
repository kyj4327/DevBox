package com.o2b2.devbox_server.gatherMate.comments.service;

import com.o2b2.devbox_server.gatherMate.comments.entity.GathermateComment;
import com.o2b2.devbox_server.gatherMate.comments.repository.GathermateCommentRepository;
import com.o2b2.devbox_server.gatherMate.comments.request.GathermateCommentCreate;
import com.o2b2.devbox_server.gatherMate.comments.response.GathermateCommentResponse;
import com.o2b2.devbox_server.gatherMate.entity.GatherMate;
import com.o2b2.devbox_server.gatherMate.repository.GatherMateRepository;
import com.o2b2.devbox_server.user.entity.UserEntity;
import com.o2b2.devbox_server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GathermateCommentService {

    private final GathermateCommentRepository gathermateCommentRepository;
    private final GatherMateRepository gatherMateRepository;
    private final UserRepository userRepository;

    // 댓글 작성
    public void write(Long postId, Long userId, GathermateCommentCreate request) {
        GatherMate post = gatherMateRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid post ID"));
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

        GathermateComment parentGathermateComment = null;
        if (request.getParentId() != null) {
            parentGathermateComment = gathermateCommentRepository.findById(request.getParentId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid parent comment ID"));
        }

        GathermateComment gathermateComment = GathermateComment.builder()
                .content(request.getContent())
                .user(user)
                .gatherMate(post)
                .parent(parentGathermateComment)
                .build();

        gathermateCommentRepository.save(gathermateComment);
    }

    // 특정 게시글의 댓글 목록 조회
    public List<GathermateCommentResponse> getCommentsByPost(Long postId) {
        GatherMate post = gatherMateRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid post ID"));

        List<GathermateComment> gathermateComments = gathermateCommentRepository.findByGatherMateAndParentIsNull(post);

        return gathermateComments.stream()
                .map(GathermateCommentResponse::fromEntity)
                .collect(Collectors.toList());
    }

}
