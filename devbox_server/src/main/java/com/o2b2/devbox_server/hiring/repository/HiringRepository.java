package com.o2b2.devbox_server.hiring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.o2b2.devbox_server.hiring.model.Hiring;

public interface HiringRepository extends JpaRepository<Hiring, Long> {

}
