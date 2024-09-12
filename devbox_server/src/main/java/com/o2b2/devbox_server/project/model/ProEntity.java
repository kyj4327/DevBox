package com.o2b2.devbox_server.project.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

    @OneToMany(mappedBy = "proEntity" )
    List<MultiImgEntity> multiImgEntitys = new ArrayList<>();

}
