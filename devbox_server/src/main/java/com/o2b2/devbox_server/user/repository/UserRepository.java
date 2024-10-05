package com.o2b2.devbox_server.user.repository;

import com.o2b2.devbox_server.user.entity.UserEntity;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    @Query("SELECT u.nickname FROM UserEntity u")
    List<String> findAllNicknames();

    UserEntity findByEmail(String email);

    Boolean existsByEmail(String email);

    UserEntity findByNickname(String nickname);

    Boolean existsByNickname(String nickname);  // 닉네임 중복 확인 메서드 추가
}
