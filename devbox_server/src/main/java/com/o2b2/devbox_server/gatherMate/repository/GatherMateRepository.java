package com.o2b2.devbox_server.gatherMate.repository;

import com.o2b2.devbox_server.gatherMate.entity.GatherMate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GatherMateRepository extends JpaRepository<GatherMate, Long> {
    Page<GatherMate> findByTitleContainingOrContentContaining(String title, String content, Pageable pageable);

    Page<GatherMate> findByAuthorContaining(String author, Pageable pageable);

    Page<GatherMate> findByIntro(String intro, Pageable pageable);

}
