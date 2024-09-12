package com.o2b2.devbox_server.hiring.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.o2b2.devbox_server.hiring.model.Hiring;

public interface HiringRepository extends JpaRepository<Hiring, Long> {
    Page<Hiring> findAll(Pageable pageable);

    Page<Hiring> findByAreaContaining(String area, Pageable pageable);

    Page<Hiring> findByAreaNotContaining(String area, Pageable pageable);

}
