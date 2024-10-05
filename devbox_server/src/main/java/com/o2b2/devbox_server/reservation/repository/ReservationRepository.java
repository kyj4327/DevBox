package com.o2b2.devbox_server.reservation.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.o2b2.devbox_server.reservation.model.Reservation;
import com.o2b2.devbox_server.user.entity.UserEntity;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    Page<Reservation> findByCondition(String condition, Pageable pageable);

    Page<Reservation> findByConditionAndDateContaining(String condition, String date, Pageable pageable);

    List<Reservation> findByDate(String date);

    Page<Reservation> findByUserEntityAndCondition(UserEntity userEntity, String condition, Pageable pageable);

    Page<Reservation> findByUserEntityAndConditionAndDateContaining(UserEntity userEntity, String condition, String date, Pageable pageable);

    List<Reservation> findByDateAndTime(String date, String time);

}
