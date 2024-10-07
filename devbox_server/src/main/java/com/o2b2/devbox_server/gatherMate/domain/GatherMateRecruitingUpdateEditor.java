package com.o2b2.devbox_server.gatherMate.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class GatherMateRecruitingUpdateEditor {

    private final boolean isRecruiting;

    @Builder
    public GatherMateRecruitingUpdateEditor(boolean isRecruiting) {
        this.isRecruiting = isRecruiting;
    }
}
