package com.o2b2.devbox_server.notice.service;

import com.o2b2.devbox_server.notice.domain.NoticePostEditor;
import com.o2b2.devbox_server.notice.entity.Notice;
import com.o2b2.devbox_server.notice.repository.NoticeRepository;
import com.o2b2.devbox_server.notice.request.NoticePostCreate;
import com.o2b2.devbox_server.notice.request.NoticePostEdit;
import com.o2b2.devbox_server.notice.response.NoticeResponse;
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
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final UserRepository userRepository;

    // 글 적기 메서드
    public Long write(NoticePostCreate noticePostCreate) {

        // UserRepository를 통해 사용자 정보를 가져옵니다.
        UserEntity user = userRepository.findById(noticePostCreate.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        Notice notice = Notice.builder()

                .title(noticePostCreate.getTitle())
                .content(noticePostCreate.getContent())
                .createdAt(LocalDateTime.now())
                .user(user)
                .author(user.getNickname())
                .build();

        Notice saveNotice = noticeRepository.save(notice);
        return saveNotice.getId();
    }

    @Transactional
    public NoticeResponse get(Long postId, Long userId) {

        Notice notice = noticeRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 글입니다."));


            notice.incrementViews();

        return NoticeResponse.builder()
                .id(notice.getId())
                .title(notice.getTitle())
                .content(notice.getContent())
                .createdAt(notice.getCreatedAt())
                .author(notice.getUser().getNickname())
                .views(notice.getViews())
                .build();
    }

    public Page<NoticeResponse> getList(Pageable pageable) {
        Page<Notice> posts = noticeRepository.findAll(pageable);

        List<NoticeResponse> responses = posts.stream()
                .map(post -> NoticeResponse.builder()
                        .id(post.getId())
                        .title(post.getTitle())
                        .content(post.getContent())
                        .createdAt(post.getCreatedAt())
                        .author(post.getAuthor())
                        .views(post.getViews())
                        .build())
                .collect(Collectors.toList());

        return new PageImpl<>(responses, pageable, posts.getTotalElements());
    }


    public Page<NoticeResponse> search(String keyword, Pageable pageable) {
        Page<Notice> posts;

       // 기본적으로 제목과 내용으로 검색
        posts = noticeRepository.findByTitleContainingOrContentContaining(keyword, keyword, pageable);

        List<NoticeResponse> responses = posts.stream()
                .map(post -> NoticeResponse.builder()
                        .id(post.getId())
                        .title(post.getTitle())
                        .content(post.getContent())
                        .createdAt(post.getCreatedAt())
                        .author(post.getAuthor()) // Notice 엔티티에 author 필드가 있다고 가정
                        .views(post.getViews())
                        .build())
                .collect(Collectors.toList());

        return new PageImpl<>(responses, pageable, posts.getTotalElements());
    }

    // 수정하기
    @Transactional
    public void edit(Long postId, NoticePostEdit postEdit, Long userId) {
        Notice notice = noticeRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 글입니다."));

        // 작성자 확인
        if (!notice.getUser().getId().equals(userId)) {
            throw new SecurityException("글 작성자만 수정할 수 있습니다.");
        }

        NoticePostEditor.NoticePostEditorBuilder editorBuilder = notice.toEditor();

        NoticePostEditor noticePostEditor = editorBuilder
                .title(postEdit.getTitle())
                .content(postEdit.getContent())
                .build();

        notice.edit(noticePostEditor);
    }


    // 삭제하기
    public void delete(Long postId, Long userId) {
        Notice notice = noticeRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 글입니다."));

        if (!notice.getUser().getId().equals(userId)) {
            throw new SecurityException("글 작성자만 삭제할 수 있습니다.");
        }

        noticeRepository.delete(notice);
    }

}
