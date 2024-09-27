package com.o2b2.devbox_server.gatherMate.service;

import com.o2b2.devbox_server.gatherMate.comments.repository.GathermateCommentRepository;
import com.o2b2.devbox_server.gatherMate.domain.GatherMatePostEditor;
import com.o2b2.devbox_server.gatherMate.entity.GatherMate;
import com.o2b2.devbox_server.gatherMate.like.repository.LikeRepository;
import com.o2b2.devbox_server.gatherMate.repository.GatherMateRepository;
import com.o2b2.devbox_server.gatherMate.request.GatherMatePostCreate;
import com.o2b2.devbox_server.gatherMate.request.GatherMatePostEdit;
import com.o2b2.devbox_server.gatherMate.response.GatherMateResponse;
import com.o2b2.devbox_server.user.entity.UserEntity;
import com.o2b2.devbox_server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GatherMateService {

    private final GatherMateRepository gatherMateRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private final GathermateCommentRepository gathermateCommentRepository;

    // 글 적기 메서드
    public Long write(GatherMatePostCreate gatherMatePostCreate) {

        // UserRepository를 통해 사용자 정보를 가져옵니다.
        UserEntity user = userRepository.findById(gatherMatePostCreate.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        GatherMate gatherMate = GatherMate.builder()
                .intro(gatherMatePostCreate.getIntro())
                .apply(gatherMatePostCreate.getApply())
                .title(gatherMatePostCreate.getTitle())
                .content(gatherMatePostCreate.getContent())
                .createdAt(LocalDateTime.now())
                .isRecruiting(gatherMatePostCreate.isRecruiting())
                .user(user)
                .author(user.getNickname())
                .build();

        GatherMate saveGatherMate = gatherMateRepository.save(gatherMate);
        return saveGatherMate.getId();
    }

    @Transactional
    public GatherMateResponse get(Long postId, Long userId) {

        GatherMate gatherMate = gatherMateRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 글입니다."));


            gatherMate.incrementViews();


        boolean isLiked = false;
        if (userId != null) {
            UserEntity user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
            isLiked = likeRepository.findByUserAndGatherMate(user, gatherMate).isPresent();
        }

        return GatherMateResponse.builder()
                .id(gatherMate.getId())
                .intro(gatherMate.getIntro())
                .apply(gatherMate.getApply())
                .title(gatherMate.getTitle())
                .content(gatherMate.getContent())
                .createdAt(gatherMate.getCreatedAt())
                .isRecruiting(gatherMate.isRecruiting())
                .author(gatherMate.getUser().getNickname())
                .likeCount(gatherMate.getLikeCount())
                .isLiked(isLiked)
                .views(gatherMate.getViews())
                .build();
    }

    public Page<GatherMateResponse> getList(Pageable pageable) {
        Page<GatherMate> posts = gatherMateRepository.findAll(pageable);

        List<GatherMateResponse> responses = posts.stream()
                .map(post -> {
                    int commentCount = gathermateCommentRepository.countByGatherMate(post);
                    boolean isLiked = false; // 필요한 경우 사용자에 따라 설정

                    return new GatherMateResponse(post, commentCount,isLiked);
                })
                .collect(Collectors.toList());

        return new PageImpl<>(responses, pageable, posts.getTotalElements()); // Page<GatherMate>를 Page<GatherMateResponse>로 변환
    }

    public Page<GatherMateResponse> getListByCategory(String category, Pageable pageable) {
        Page<GatherMate> posts = gatherMateRepository.findByIntro(category, pageable);

        List<GatherMateResponse> responses = posts.stream()
                .map(post -> {
                    int commentCount = gathermateCommentRepository.countByGatherMate(post);
                    boolean isLiked = false; // 필요한 경우 사용자에 따라 설정
                    return new GatherMateResponse(post, commentCount,isLiked);
                })
                .collect(Collectors.toList());

        return new PageImpl<>(responses, pageable, posts.getTotalElements());
    }

    // 검색
//    public List<GatherMateResponse> search(String keyword, Pageable pageable) {
//        return gatherMateRepository.findByTitleContainingOrContentContaining(keyword, keyword, pageable)
//                .stream()
//                .map(GatherMateResponse::new)
//                .collect(Collectors.toList());
//    }
    public Page<GatherMateResponse> search(String keyword, String searchType, Pageable pageable) {
        Page<GatherMate> posts;

        if ("작성자".equals(searchType)) {
            // 작성자명으로 검색
            posts = gatherMateRepository.findByAuthorContaining(keyword, pageable);
        } else {
            // 기본적으로 제목과 내용으로 검색
            posts = gatherMateRepository.findByTitleContainingOrContentContaining(keyword, keyword, pageable);
        }

        List<GatherMateResponse> responses = posts.stream()
                .map(post -> {
                    int commentCount = gathermateCommentRepository.countByGatherMate(post);
                    boolean isLiked = false; // 필요한 경우 사용자에 따라 설정
                    return new GatherMateResponse(post, commentCount, isLiked);
                })
                .collect(Collectors.toList());

        return new PageImpl<>(responses, pageable, posts.getTotalElements());
    }

    // 수정하기
    @Transactional
    public void edit(Long postId, GatherMatePostEdit postEdit, Long userId) {
        GatherMate gatherMate = gatherMateRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 글입니다."));

        // 작성자 확인
        if (!gatherMate.getUser().getId().equals(userId)) {
            throw new SecurityException("글 작성자만 수정할 수 있습니다.");
        }

        GatherMatePostEditor.GatherMatePostEditorBuilder editorBuilder = gatherMate.toEditor();

        GatherMatePostEditor gatherMatePostEditor = editorBuilder
                .intro(postEdit.getIntro())
                .apply(postEdit.getApply())
                .title(postEdit.getTitle())
                .content(postEdit.getContent())
                .isRecruiting(postEdit.isRecruiting())
                .build();

        gatherMate.edit(gatherMatePostEditor);
    }

    // 모집중 변경 로직
    @Transactional
    public void updateRecruitmentStatus(Long postId, GatherMatePostEdit postEdit, Long userId) {
        GatherMate gatherMate = gatherMateRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 글입니다."));

        // 작성자 확인
        if (!gatherMate.getUser().getId().equals(userId)) {
            throw new SecurityException("글 작성자만 모집 상태를 변경할 수 있습니다.");
        }

        GatherMatePostEditor.GatherMatePostEditorBuilder editorBuilder = gatherMate.toEditor();

        // 모집중, 모집변경만 변경
        GatherMatePostEditor gatherMatePostEditor = editorBuilder
                    .isRecruiting(postEdit.isRecruiting())
                            .build();

        gatherMate.edit(gatherMatePostEditor);
    }


    // 삭제하기
    public void delete(Long postId, Long userId) {
        GatherMate gatherMate = gatherMateRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 글입니다."));

        if (!gatherMate.getUser().getId().equals(userId)) {
            throw new SecurityException("글 작성자만 삭제할 수 있습니다.");
        }

        gatherMateRepository.delete(gatherMate);
    }

    // 좋아요 기능 구현
    public int getLikeCount(Long postId) {
        GatherMate gatherMate = gatherMateRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 글입니다."));

        return gatherMate.getLikeCount();
    }
}
