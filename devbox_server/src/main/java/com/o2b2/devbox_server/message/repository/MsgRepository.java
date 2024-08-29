package com.o2b2.devbox_server.message.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.o2b2.devbox_server.message.model.MsgEntity;

public interface MsgRepository extends JpaRepository <MsgEntity, Long> {

    
}
