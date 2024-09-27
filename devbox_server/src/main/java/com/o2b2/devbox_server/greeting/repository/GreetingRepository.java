package com.o2b2.devbox_server.greeting.repository;

import com.o2b2.devbox_server.greeting.entity.Greeting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GreetingRepository extends JpaRepository<Greeting, Long> {
    Page<Greeting> findByContentContaining(String content, Pageable pageable);

    Page<Greeting> findByAuthorContaining(String author, Pageable pageable);
}
