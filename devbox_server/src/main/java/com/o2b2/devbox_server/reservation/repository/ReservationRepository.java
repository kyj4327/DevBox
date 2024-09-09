package com.o2b2.devbox_server.reservation.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.o2b2.devbox_server.reservation.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    Page<Reservation> findByCondition(String condition, Pageable pageable);

    Page<Reservation> findByConditionAndDateContaining(String condition, String date, Pageable pageable);

    List<Reservation> findByDate(String date);

}
