package com.o2b2.devbox_server.gatherMate.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GatherMateRecruitingUpdate {

    @JsonProperty("isRecruiting") // JSON 필드와 일치하도록 명시
    private boolean isRecruiting;

    @Builder
    public GatherMateRecruitingUpdate(boolean isRecruiting) {
        this.isRecruiting = isRecruiting;
    }
}
