package com.o2b2.devbox_server.eduInfo.dto;

import com.o2b2.devbox_server.eduInfo.model.EduEntity;

import lombok.Data;

@Data
public class EduData {
    Long id;

    EduEntity eduEntity;
}
