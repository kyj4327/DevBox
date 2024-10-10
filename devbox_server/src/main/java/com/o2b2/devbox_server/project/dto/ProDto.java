package com.o2b2.devbox_server.project.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.o2b2.devbox_server.project.model.ProEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProDto {

    private Long id;
    private String title;
    private String name;
    private String link;
    private String coment;
    private LocalDateTime time;
    private List<MultiImgDto> multiImgEntitys;
    private List<ProLikeDto> proLikes;
    private int likeCount;
    private String userNickname;

    // ProEntity로부터 ProDto를 생성하는 메서드
    public static ProDto fromEntity(ProEntity proEntity) {

        return new ProDto(
                proEntity.getId(),
                proEntity.getTitle(),
                proEntity.getName(),
                proEntity.getLink(),
                proEntity.getComent(),
                proEntity.getTime(),
                proEntity.getMultiImgEntitys().stream().map(
                        miEntity -> new MultiImgDto(miEntity.getId(), miEntity.getImg())).collect(Collectors.toList()),
                proEntity.getProLikes().stream()
                        .map(proLike -> new ProLikeDto(proLike.getId(), proLike.getUser().getId(),
                                proLike.getProEntity().getId()))
                        .collect(Collectors.toList()),

                proEntity.getLikeCount(),
                proEntity.getUserEntity().getNickname() // UserEntity의 닉네임 가져오기
        );
    }
}