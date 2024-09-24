package com.o2b2.devbox_server.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class ProLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id")
    UserEntity user;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "proEntity_id")
    ProEntity proEntity;


}
