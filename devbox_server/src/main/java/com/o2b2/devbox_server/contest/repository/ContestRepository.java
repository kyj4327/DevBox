package com.o2b2.devbox_server.contest.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.o2b2.devbox_server.contest.model.Contest;

public interface ContestRepository extends JpaRepository<Contest, Long> {
    Page<Contest> findByRegEndGreaterThanEqual(String today, Pageable pageable);

}
