package com.o2b2.devbox_server.eduInfo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.o2b2.devbox_server.eduInfo.model.EduEntity;
import java.util.List;





public interface EduRepository extends JpaRepository <EduEntity, Long>{
    Page<EduEntity> findByTitleContaining(String search, Pageable pageable);

    List<EduEntity> findByState(String string);

    @Query("SELECT e FROM EduEntity e WHERE e.state = ?1 ORDER BY (DATEDIFF(CURRENT_DATE, CAST(SUBSTRING(e.recruit, LENGTH(e.recruit) - 9, 10) AS DATE))) DESC")
    Page<EduEntity> findByStateOrderByRemainingDays(String state, Pageable pageable);
}

