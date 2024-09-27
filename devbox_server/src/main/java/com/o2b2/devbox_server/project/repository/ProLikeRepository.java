package com.o2b2.devbox_server.project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.o2b2.devbox_server.project.model.ProEntity;
import com.o2b2.devbox_server.project.model.ProLike;
import com.o2b2.devbox_server.user.entity.UserEntity;




public interface ProLikeRepository extends JpaRepository <ProLike, Long>{
    Optional<ProLike> findByUserAndProEntity(UserEntity user, ProEntity proEntity);

    List<ProLike> findByUser(UserEntity user);

}

