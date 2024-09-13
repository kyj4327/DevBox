package com.o2b2.devbox_server.message.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.o2b2.devbox_server.message.model.MsgReciverEntity;

public interface MsgReciverRepository extends JpaRepository <MsgReciverEntity, Long> {

    Page<MsgReciverEntity> findBySender(String sender, Pageable pageable);

    Page<MsgReciverEntity> findByReciver(String sender, Pageable pageable);

    List<MsgReciverEntity> findByReciver(String reciver);

    
}
