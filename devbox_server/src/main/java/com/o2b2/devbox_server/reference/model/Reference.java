package com.o2b2.devbox_server.reference.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Reference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String title;

    String selectJob;

    String content1;

    String content2;

    String content3;

    String content4;

    String content5;

    String link;
}
