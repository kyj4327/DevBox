package com.o2b2.devbox_server.project.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class MultiImgEntity {
    @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String img;

    @JsonIgnore
    @ManyToOne
    ProEntity proEntity;

}
