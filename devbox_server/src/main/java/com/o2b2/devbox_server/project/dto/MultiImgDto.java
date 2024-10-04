package com.o2b2.devbox_server.project.dto;


import com.o2b2.devbox_server.project.model.MultiImgEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MultiImgDto {
    Long id;
    String img;

    public MultiImgDto(Long id, String img) {
        this.id = id;
        this.img = img;
    }

    // ProEntity로부터 ProDto를 생성하는 메서드
    public static MultiImgDto fromEntity(MultiImgEntity mie) {

        return new MultiImgDto(
            mie.getId(), mie.getImg()
        );
    }
}