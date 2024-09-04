package com.o2b2.devbox_server.reservation.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.o2b2.devbox_server.reservation.model.Reservation;
import com.o2b2.devbox_server.reservation.repository.ReservationRepository;

@RestController
@CrossOrigin
public class ReservationController {
    @Autowired
    ReservationRepository reservationRepository;

    @PostMapping("/reservation")
    public Map<String, Object> reservation(@RequestBody Reservation reservation) {
        Reservation result = reservationRepository.save(reservation);
        Map<String, Object> map = new HashMap<>();
        map.put("code", 200);
        map.put("msg", "입력 완료");
        map.put("result", result);
        return map;
    }

    @GetMapping("/reservation/check")
    public List<Reservation> reservationCheck() {
        List<Reservation> list = reservationRepository.findAll();
        return list;
    }

}
