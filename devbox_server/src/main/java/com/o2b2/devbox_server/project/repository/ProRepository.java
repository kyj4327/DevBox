package com.o2b2.devbox_server.project.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.o2b2.devbox_server.project.model.ProEntity;




public interface ProRepository extends JpaRepository <ProEntity, Long>{

   
    // 최신순 정렬 (time 필드를 기준으로 내림차순)
    Page<ProEntity> findByOrderByTimeDesc(Pageable pageable);

    // 인기순 정렬 (likeCount 필드를 기준으로 내림차순, 그다음 time 내림차순)
    Page<ProEntity> findByOrderByLikeCountDescTimeDesc(Pageable pageable);

    // Page<ProEntity> findAll(Pageable pageable);

    Page<ProEntity> findByUserEntityNickname(String currentNickname, Pageable pageable);

}

