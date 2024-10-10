package com.o2b2.devbox_server.greeting.comments.service;

import com.o2b2.devbox_server.greeting.comments.domain.GreetingCommentEditor;
import com.o2b2.devbox_server.greeting.comments.entity.GreetingComment;
import com.o2b2.devbox_server.greeting.comments.repository.GreetingCommentRepository;
import com.o2b2.devbox_server.greeting.comments.request.GreetingCommentCreate;
import com.o2b2.devbox_server.greeting.comments.request.GreetingCommentEdit;
import com.o2b2.devbox_server.greeting.comments.response.GreetingCommentResponse;
import com.o2b2.devbox_server.greeting.entity.Greeting;
import com.o2b2.devbox_server.greeting.repository.GreetingRepository;
import com.o2b2.devbox_server.user.entity.UserEntity;
import com.o2b2.devbox_server.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GreetingCommentService {

    private final GreetingCommentRepository greetingCommentRepository;
    private final GreetingRepository greetingRepository;
    private final UserRepository userRepository;

    // 댓글 작성
    public void write(Long postId, Long userId, GreetingCommentCreate request) {
        Greeting post = greetingRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid post ID"));
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

        GreetingComment parentGreetingComment = null;
        if (request.getParentId() != null) {
            parentGreetingComment = greetingCommentRepository.findById(request.getParentId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid parent comment ID"));
        }

        GreetingComment greetingComment = GreetingComment.builder()
                .content(request.getContent())
                .user(user)
                .greeting(post)
                .parent(parentGreetingComment)
                .build();

        greetingCommentRepository.save(greetingComment);
    }

    @Transactional
    public void editComment(Long commentId, Long userId, GreetingCommentEdit request) {
        GreetingComment greetingComment = greetingCommentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 댓글입니다."));

        // 작성자 확인
        if (!greetingComment.getUser().getId().equals(userId)) {
            throw new SecurityException("댓글 작성자만 수정할 수 있습니다.");
        }

        GreetingCommentEditor.GreetingCommentEditorBuilder editorBuilder = greetingComment.toEditor();

        GreetingCommentEditor editor = editorBuilder
                .content(request.getContent())
                .build();

        greetingComment.edit(editor);
    }

    // 댓글 삭제
    @Transactional
    public void deleteComment(Long commentId, Long userId) {
        GreetingComment comment = greetingCommentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 댓글입니다."));

        // 작성자 확인
        if (!comment.getUser().getId().equals(userId)) {
            throw new SecurityException("댓글 작성자만 삭제할 수 있습니다.");
        }

        if (comment.getParent() == null) {
            // 부모 댓글인 경우, 자식 댓글 여부 확인
            List<GreetingComment> childComments = greetingCommentRepository.findByParent(comment);
            if (childComments.isEmpty()) {
                // 자식 댓글이 없으면 실제로 삭제
                greetingCommentRepository.delete(comment);
            } else {
                // 자식 댓글이 있으면 deleted 플래그를 true로 설정
                comment.setDeleted(true);
            }
        } else {
            // 자식 댓글인 경우, 실제로 삭제
            greetingCommentRepository.delete(comment);

            // 부모 댓글의 남은 자식 댓글 확인
            GreetingComment parent = comment.getParent();
            List<GreetingComment> remainingReplies = greetingCommentRepository.findByParent(parent);

            if (remainingReplies.isEmpty() && parent.isDeleted()) {
                // 부모 댓글이 삭제 표시되어 있고 남은 자식 댓글이 없으면, 부모 댓글도 삭제
                greetingCommentRepository.delete(parent);
            }
        }
    }

    // 특정 게시글의 댓글 목록 조회
    public List<GreetingCommentResponse> getCommentsByPost(Long postId) {
        Greeting post = greetingRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid post ID"));

        List<GreetingComment> greetingComments = greetingCommentRepository.findByGreetingAndParentIsNull(post);

        return greetingComments.stream()
                .map(GreetingCommentResponse::fromEntity)
                .collect(Collectors.toList());
    }

}
