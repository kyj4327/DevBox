package com.o2b2.devbox_server.project.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.o2b2.devbox_server.message.model.MsgEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class ProEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String title;

    String name;

    String link;

    String coment;

    Integer likeCount;

    @OneToMany(mappedBy = "proEntity", cascade = CascadeType.REMOVE)
    List<MultiImgEntity> multiImgEntitys = new ArrayList<>();

    @JsonIgnore
    @ManyToOne
    ProEntity proEntity;
    
    @ManyToOne
    MsgEntity msgEntity;
}
