package com.o2b2.devbox_server.user.repository;

import com.o2b2.devbox_server.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    UserEntity findByEmail(String email);
    UserEntity findByNickname(String nickname);

    Boolean existsByEmail(String email);

    UserEntity findByNickname(String nickname);
}
