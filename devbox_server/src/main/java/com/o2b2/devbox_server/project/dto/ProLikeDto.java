package com.o2b2.devbox_server.project.dto;
import com.o2b2.devbox_server.project.model.ProLike;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProLikeDto {
    private Long id;           // ProLike의 ID
    private Long userId;       // UserEntity의 ID
    private Long proEntityId;  // ProEntity의 ID

    // ProLike 엔티티를 DTO로 변환하는 메서드
    public static ProLikeDto fromEntity(ProLike proLike) {
        return new ProLikeDto(
            proLike.getId(),
            proLike.getUser().getId(),       // user의 ID만 포함
            proLike.getProEntity().getId()   // proEntity의 ID만 포함
        );
    }
}