package com.o2b2.devbox_server.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.o2b2.devbox_server.project.model.MultiImgEntity;
import com.o2b2.devbox_server.project.model.ProEntity;




public interface MultiImgRepository extends JpaRepository <MultiImgEntity, Long>{

    Optional<ProEntity> findByimg(String img);

}

