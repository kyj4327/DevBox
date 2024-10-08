package com.o2b2.devbox_server.message.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.o2b2.devbox_server.message.model.MsgEntity;
import com.o2b2.devbox_server.message.model.MsgReciverEntity;
import com.o2b2.devbox_server.user.entity.UserEntity;

public interface MsgReciverRepository extends JpaRepository <MsgReciverEntity, Long> {

    Page<MsgEntity> findByReceiver(UserEntity sender, Pageable pageable);

    List<MsgReciverEntity> findByReceiver(UserEntity reciver);

    Page<MsgReciverEntity> findByReceiverAndLikeIsTrue(UserEntity userEntity, Pageable pageable);


    Page<MsgEntity> findByReceiverAndLikeIsTrue(UserEntity userEntity, Pageable pageable);
}

