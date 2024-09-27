package com.o2b2.devbox_server.gatherMate.comments.service;

import com.o2b2.devbox_server.gatherMate.comments.domain.GathermateCommentEditor;
import com.o2b2.devbox_server.gatherMate.comments.entity.GathermateComment;
import com.o2b2.devbox_server.gatherMate.comments.repository.GathermateCommentRepository;
import com.o2b2.devbox_server.gatherMate.comments.request.GathermateCommentCreate;
import com.o2b2.devbox_server.gatherMate.comments.request.GathermateCommentEdit;
import com.o2b2.devbox_server.gatherMate.comments.response.GathermateCommentResponse;
import com.o2b2.devbox_server.gatherMate.entity.GatherMate;
import com.o2b2.devbox_server.gatherMate.repository.GatherMateRepository;
import com.o2b2.devbox_server.user.entity.UserEntity;
import com.o2b2.devbox_server.user.repository.UserRepository;
import jakarta.transaction.Transactional;
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

    @Transactional
    public void editComment(Long commentId, Long userId, GathermateCommentEdit request) {
        GathermateComment gathermateComment = gathermateCommentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 댓글입니다."));

        // 작성자 확인
        if (!gathermateComment.getUser().getId().equals(userId)) {
            throw new SecurityException("댓글 작성자만 수정할 수 있습니다.");
        }

        GathermateCommentEditor.GathermateCommentEditorBuilder editorBuilder = gathermateComment.toEditor();

        GathermateCommentEditor editor = editorBuilder
                .content(request.getContent())
                .build();

        gathermateComment.edit(editor);
    }

    // 댓글 삭제
    @Transactional
    public void deleteComment(Long commentId, Long userId) {
        GathermateComment comment = gathermateCommentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 댓글입니다."));

        // 작성자 확인
        if (!comment.getUser().getId().equals(userId)) {
            throw new SecurityException("댓글 작성자만 삭제할 수 있습니다.");
        }

        if (comment.getParent() == null) {
            // 부모 댓글인 경우, 자식 댓글 여부 확인
            List<GathermateComment> childComments = gathermateCommentRepository.findByParent(comment);
            if (childComments.isEmpty()) {
                // 자식 댓글이 없으면 실제로 삭제
                gathermateCommentRepository.delete(comment);
            } else {
                // 자식 댓글이 있으면 deleted 플래그를 true로 설정
                comment.setDeleted(true);
            }
        } else {
            // 자식 댓글인 경우, 실제로 삭제
            gathermateCommentRepository.delete(comment);

            // 부모 댓글의 남은 자식 댓글 확인
            GathermateComment parent = comment.getParent();
            List<GathermateComment> remainingReplies = gathermateCommentRepository.findByParent(parent);

            if (remainingReplies.isEmpty() && parent.isDeleted()) {
                // 부모 댓글이 삭제 표시되어 있고 남은 자식 댓글이 없으면, 부모 댓글도 삭제
                gathermateCommentRepository.delete(parent);
            }
        }
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
