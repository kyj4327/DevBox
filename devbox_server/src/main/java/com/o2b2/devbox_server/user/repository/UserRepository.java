package com.o2b2.devbox_server.user.repository;

import com.o2b2.devbox_server.user.entity.UserEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    @Query("SELECT u.nickname FROM UserEntity u")
    List<String> findAllNicknames();

    UserEntity findByEmail(String email);

    UserEntity findByNickname(String nickname);

    Boolean existsByEmail(String email);

}
