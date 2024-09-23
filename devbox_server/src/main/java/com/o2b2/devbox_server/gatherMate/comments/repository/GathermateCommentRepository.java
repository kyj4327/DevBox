package com.o2b2.devbox_server.gatherMate.comments.repository;

import com.o2b2.devbox_server.gatherMate.comments.entity.GathermateComment;
import com.o2b2.devbox_server.gatherMate.entity.GatherMate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GathermateCommentRepository extends JpaRepository<GathermateComment, Long> {

    List<GathermateComment> findByGatherMateAndParentIsNull(GatherMate gatherMate);

    List<GathermateComment> findByParent(GathermateComment parent);

}
