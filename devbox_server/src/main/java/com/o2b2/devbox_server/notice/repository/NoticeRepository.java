package com.o2b2.devbox_server.notice.repository;

import com.o2b2.devbox_server.notice.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    Page<Notice> findByTitleContainingOrContentContaining(String title, String content, Pageable pageable);

}
