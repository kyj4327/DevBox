package com.o2b2.devbox_server.project.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.o2b2.devbox_server.project.model.ProEntity;




public interface ProRepository extends JpaRepository <ProEntity, Long>{
    Page<ProEntity> findAll(Pageable pageable);

    Page<ProEntity> findByUserEntityNickname(String currentNickname, Pageable pageable);

}

