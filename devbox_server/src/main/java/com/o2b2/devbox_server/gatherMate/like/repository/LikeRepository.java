package com.o2b2.devbox_server.gatherMate.like.repository;

import com.o2b2.devbox_server.gatherMate.entity.GatherMate;
import com.o2b2.devbox_server.gatherMate.like.entity.Like;
import com.o2b2.devbox_server.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {

   Optional<Like> findByUserAndGatherMate(UserEntity user, GatherMate gatherMate);

   long countByGatherMate(GatherMate gatherMate);
}
