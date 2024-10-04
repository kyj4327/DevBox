package com.o2b2.devbox_server.hiring.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Hiring {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String company;

    String area;

    String job;

    String career;

    String imgUrl;

    String wantedUrl;
}
