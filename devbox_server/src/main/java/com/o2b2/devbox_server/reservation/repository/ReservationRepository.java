package com.o2b2.devbox_server.reservation.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.o2b2.devbox_server.reservation.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

}
