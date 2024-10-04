package com.o2b2.devbox_server.greeting.comments.repository;

import com.o2b2.devbox_server.greeting.comments.entity.GreetingComment;
import com.o2b2.devbox_server.greeting.entity.Greeting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GreetingCommentRepository extends JpaRepository<GreetingComment, Long> {

    List<GreetingComment> findByGreetingAndParentIsNull(Greeting greeting);

    List<GreetingComment> findByParent(GreetingComment parent);

    int countByGreeting(Greeting greeting);
}
