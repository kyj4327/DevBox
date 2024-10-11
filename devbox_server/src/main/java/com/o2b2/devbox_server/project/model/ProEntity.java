package com.o2b2.devbox_server.project.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.o2b2.devbox_server.message.model.MsgReciverEntity;
import com.o2b2.devbox_server.user.entity.UserEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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

    String link;

    @Column(length = 500, nullable = false)
    String coment;

    LocalDateTime time;


    @OneToMany(mappedBy = "proEntity", cascade = CascadeType.REMOVE)
    List<MultiImgEntity> multiImgEntitys = new ArrayList<>();

    @OneToMany(mappedBy = "proEntity", cascade = CascadeType.REMOVE)
    List<ProLike> proLikes = new ArrayList<>();
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    UserEntity userEntity;

    // 좋아요 카운트를 저장하는 필드 추가
    int likeCount = 0;

    // 좋아요 수를 업데이트하는 메서드
    public void increaseLikeCount() {
        this.likeCount++;
    }

    public void decreaseLikeCount() {
        if (this.likeCount > 0) {   
            this.likeCount--;
        }
    }
}
