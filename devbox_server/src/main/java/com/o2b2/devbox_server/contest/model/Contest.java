package com.o2b2.devbox_server.contest.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Contest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String title;

    String officialUrl;

    String imgUrl;

    String host;

    String target;

    String regStart;

    String regEnd;

}
