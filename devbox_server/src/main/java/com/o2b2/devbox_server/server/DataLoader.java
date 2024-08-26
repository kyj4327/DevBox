package com.o2b2.devbox_server.server;

import com.o2b2.devbox_server.entity.Post;
import com.o2b2.devbox_server.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class DataLoader implements CommandLineRunner {

    private final PostRepository postRepository;

    @Autowired
    public DataLoader(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // 데이터베이스에 기본 데이터 삽입
        postRepository.save(new Post("FreeBoard에 오신 것을 환영합니다!", "여기서 자유롭게 생각을 공유하세요.", 1, new Date()));
        postRepository.save(new Post("React vs Vue", "어떤 것을 선호하시나요? 그리고 그 이유는 무엇인가요?", 2, new Date()));
        postRepository.save(new Post("다가오는 이벤트", "자세한 내용은 이벤트 섹션을 확인하세요.", 3, new Date()));
        postRepository.save(new Post("Next.js 사용해보기", "서버 사이드 렌더링에 대해 이야기해봅시다.", 4, new Date()));
        postRepository.save(new Post("JavaScript 최신 문법", "ECMAScript 2023의 새로운 기능을 알아봅시다.", 5, new Date()));
        postRepository.save(new Post("Python과 데이터 과학", "데이터 분석을 위한 Python의 강력한 기능들.", 6, new Date()));
        postRepository.save(new Post("AI와 머신러닝", "AI와 머신러닝의 현재와 미래.", 7, new Date()));
        postRepository.save(new Post("스타트업 이야기", "성공적인 스타트업의 비결.", 8, new Date()));
        postRepository.save(new Post("웹 개발의 미래", "웹 개발 트렌드 및 향후 전망.", 9, new Date()));
        postRepository.save(new Post("프로그래밍 언어 비교", "여러 언어의 장단점 비교.", 10, new Date()));
    }
}
