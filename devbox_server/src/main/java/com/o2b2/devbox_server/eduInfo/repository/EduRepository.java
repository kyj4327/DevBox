package com.o2b2.devbox_server.eduInfo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.o2b2.devbox_server.eduInfo.model.EduEntity;
import java.util.List;




public interface EduRepository extends JpaRepository <EduEntity, Long>{
    Page<EduEntity> findByTitleContaining(String search, Pageable pageable);

    Page<EduEntity> findByState(String state, Pageable pageable);
}

