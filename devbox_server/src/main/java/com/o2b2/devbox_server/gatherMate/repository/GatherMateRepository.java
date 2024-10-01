package com.o2b2.devbox_server.gatherMate.repository;

import com.o2b2.devbox_server.gatherMate.entity.GatherMate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GatherMateRepository extends JpaRepository<GatherMate, Long> {
    Page<GatherMate> findByTitleContainingOrContentContaining(String title, String content, Pageable pageable);

    Page<GatherMate> findByAuthorContaining(String author, Pageable pageable);

    Page<GatherMate> findByIntro(String intro, Pageable pageable);

    // 사용자 ID로 게시글 조회
    Page<GatherMate> findByUserId(Long userId, Pageable pageable);

    long countByUserId(Long userId);

    // 사용자 ID와 작성자명으로 게시글 검색
    Page<GatherMate> findByUserIdAndAuthorContaining(Long userId, String author, Pageable pageable);

    // 사용자 ID와 제목 또는 내용으로 게시글 검색
    Page<GatherMate> findByUserIdAndTitleContainingOrUserIdAndContentContaining(
            Long userId1, String titleKeyword, Long userId2, String contentKeyword, Pageable pageable);

    // 사용자 ID 유저 카테고리
    Page<GatherMate> findByUserIdAndIntro(Long userId,String intro, Pageable pageable);

}
