package com.o2b2.devbox_server.greeting.service;

import com.o2b2.devbox_server.greeting.comments.repository.GreetingCommentRepository;
import com.o2b2.devbox_server.greeting.domain.GreetingPostEditor;
import com.o2b2.devbox_server.greeting.entity.Greeting;
import com.o2b2.devbox_server.greeting.repository.GreetingRepository;
import com.o2b2.devbox_server.greeting.request.GreetingPostCreate;
import com.o2b2.devbox_server.greeting.request.GreetingPostEdit;
import com.o2b2.devbox_server.greeting.response.GreetingResponse;
import com.o2b2.devbox_server.user.entity.UserEntity;
import com.o2b2.devbox_server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GreetingService {

    private final GreetingRepository greetingRepository;
    private final UserRepository userRepository;
    private final GreetingCommentRepository greetingCommentRepository;

    // 글 적기 메서드
    public Long write(GreetingPostCreate greetingPostCreate) {

        // UserRepository를 통해 사용자 정보를 가져옵니다.
        UserEntity user = userRepository.findById(greetingPostCreate.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        Greeting greeting = Greeting.builder()
                .content(greetingPostCreate.getContent())
                .createdAt(LocalDateTime.now())
                .user(user)
                .author(user.getNickname())
                .field(user.getField())
                .build();

        Greeting saveGreeting = greetingRepository.save(greeting);
        return saveGreeting.getId();
    }

    @Transactional
    public GreetingResponse get(Long postId, Long userId) {

        Greeting greeting = greetingRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 글입니다."));

        return GreetingResponse.builder()
                .id(greeting.getId())
                .content(greeting.getContent())
                .createdAt(greeting.getCreatedAt())
                .author(greeting.getUser().getNickname())
                .build();
    }

    public Page<GreetingResponse> getList(Pageable pageable) {
        Page<Greeting> posts = greetingRepository.findAll(pageable);

        List<GreetingResponse> responses = posts.stream()
                .map(post -> {
                    int commentCount = greetingCommentRepository.countByGreeting(post);

                    return new GreetingResponse(post, commentCount);
                })
                .collect(Collectors.toList());

        return new PageImpl<>(responses, pageable, posts.getTotalElements()); // Page<Greeting>를 Page<GreetingResponse>로 변환
    }


    public Page<GreetingResponse> search(String keyword, String searchType, Pageable pageable) {
        Page<Greeting> posts;

        if ("작성자".equals(searchType)) {
            // 작성자명으로 검색
            posts = greetingRepository.findByAuthorContaining(keyword, pageable);
        } else {
            // 기본: 내용으로 검색
            posts = greetingRepository.findByContentContaining(keyword, pageable);
        }

        List<GreetingResponse> responses = posts.stream()
                .map(post -> {
                    int commentCount = greetingCommentRepository.countByGreeting(post);
                    return new GreetingResponse(post, commentCount);
                })
                .collect(Collectors.toList());

        return new PageImpl<>(responses, pageable, posts.getTotalElements());
    }

    // 수정하기
    @Transactional
    public void edit(Long postId, GreetingPostEdit postEdit, Long userId) {
        Greeting greeting = greetingRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 글입니다."));

        // 작성자 확인
        if (!greeting.getUser().getId().equals(userId)) {
            throw new SecurityException("글 작성자만 수정할 수 있습니다.");
        }

        GreetingPostEditor.GreetingPostEditorBuilder editorBuilder = greeting.toEditor();

        GreetingPostEditor greetingPostEditor = editorBuilder
                .content(postEdit.getContent())
                .build();

        greeting.edit(greetingPostEditor);
    }


    // 삭제하기
    public void delete(Long postId, Long userId) {
        Greeting greeting = greetingRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 글입니다."));

        if (!greeting.getUser().getId().equals(userId)) {
            throw new SecurityException("글 작성자만 삭제할 수 있습니다.");
        }

        greetingRepository.delete(greeting);
    }
}
