package com.o2b2.devbox_server.gatherMate.like.service;

import com.o2b2.devbox_server.gatherMate.entity.GatherMate;
import com.o2b2.devbox_server.gatherMate.like.entity.Like;
import com.o2b2.devbox_server.gatherMate.like.repository.LikeRepository;
import com.o2b2.devbox_server.gatherMate.repository.GatherMateRepository;
import com.o2b2.devbox_server.user.entity.UserEntity;
import com.o2b2.devbox_server.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final GatherMateRepository gatherMateRepository;
    private final UserRepository userRepository;

    @Transactional
    public boolean toggleLike(Long userId, Long postId) {

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자 찾을 수 없습니다."));

        GatherMate gatherMate = gatherMateRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("모여라메이트 게시글을 찾을 수 없습니다."));

        Optional<Like> existingLike = likeRepository.findByUserAndGatherMate(user, gatherMate);

        if (existingLike.isPresent()) {

            // 좋아요 눌렀으면 취소
            likeRepository.delete(existingLike.get());
            gatherMate.setLikeCount(Math.max(0, gatherMate.getLikeCount() - 1));
            return false;
        } else {
            // 좋아요 추가
            Like like = Like.builder()
                    .user(user)
                    .gatherMate(gatherMate)
                    .build();
            likeRepository.save(like);
            gatherMate.setLikeCount(gatherMate.getLikeCount() + 1);
            return true;
        }
    }


    @Transactional
    public boolean isUserLikedPost(Long userId, Long postId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        GatherMate post = gatherMateRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("게시물을 찾을 수 없습니다."));

        return likeRepository.findByUserAndGatherMate(user, post).isPresent();
    }
}

