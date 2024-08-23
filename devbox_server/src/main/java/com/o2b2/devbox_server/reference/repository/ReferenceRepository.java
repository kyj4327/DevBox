package com.o2b2.devbox_server.reference.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.o2b2.devbox_server.reference.model.Reference;

public interface ReferenceRepository extends JpaRepository<Reference, Long> {
    List<Reference> findBySelectJob(String selectJob);

}
