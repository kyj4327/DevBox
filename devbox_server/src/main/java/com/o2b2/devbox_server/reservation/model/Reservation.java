package com.o2b2.devbox_server.reservation.model;

import com.o2b2.devbox_server.user.entity.UserEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String date;

    String time;

    String condition;

    @ManyToOne
    @JoinColumn(name = "user_id")
    UserEntity userEntity;

}
