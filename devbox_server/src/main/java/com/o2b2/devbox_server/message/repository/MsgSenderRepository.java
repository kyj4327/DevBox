package com.o2b2.devbox_server.message.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.o2b2.devbox_server.message.model.MsgSenderEntity;

public interface MsgSenderRepository extends JpaRepository <MsgSenderEntity, Long> {

    Page<MsgSenderEntity> findBySender(String sender, Pageable pageable);

    Page<MsgSenderEntity> findByReciver(String sender, Pageable pageable);

    List<MsgSenderEntity> findBySender(String Sender);

    
}
