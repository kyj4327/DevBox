package com.o2b2.devbox_server.gatherMate.like.entity;

import com.o2b2.devbox_server.gatherMate.entity.GatherMate;
import com.o2b2.devbox_server.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "likes")
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gather_mate_id")
    private GatherMate gatherMate;

}
