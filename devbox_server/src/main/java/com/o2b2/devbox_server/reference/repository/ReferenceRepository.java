package com.o2b2.devbox_server.reference.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.o2b2.devbox_server.reference.model.Reference;
import com.o2b2.devbox_server.user.entity.UserEntity;

public interface ReferenceRepository extends JpaRepository<Reference, Long> {
    Page<Reference> findAll(Pageable pageable);

    Page<Reference> findBySelectJob(String selectJob, Pageable pageable);

    Page<Reference> findByUserEntity(UserEntity userEntity, Pageable pageable);

    Page<Reference> findByUserEntityAndSelectJob(UserEntity userEntity, String selectJob, Pageable pageable);

}
