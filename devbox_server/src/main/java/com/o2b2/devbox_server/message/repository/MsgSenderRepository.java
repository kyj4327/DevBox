package com.o2b2.devbox_server.message.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.o2b2.devbox_server.message.model.MsgEntity;
import com.o2b2.devbox_server.message.model.MsgSenderEntity;
import com.o2b2.devbox_server.user.entity.UserEntity;

public interface MsgSenderRepository extends JpaRepository <MsgSenderEntity, Long> {

    Page<MsgEntity> findBySender(UserEntity sender, Pageable pageable);

    Page<MsgSenderEntity> findBySenderAndLikeIsTrue(UserEntity userEntity, Pageable pageable);

    
}