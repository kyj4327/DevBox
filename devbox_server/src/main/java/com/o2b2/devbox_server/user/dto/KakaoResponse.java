package com.o2b2.devbox_server.user.dto;

import java.util.Map;

public class KakaoResponse implements OAuth2Response {

    private final Map<String, Object> attribute;

    public KakaoResponse(Map<String, Object> attribute) {

        this.attribute = attribute;
    }

    @Override
    public String getProvider() {

        return "kakao";
    }

    @Override
    public String getProviderId() {

        return attribute.get("id").toString();
    }

    @Override
    public String getEmail() {
        // "kakao_account" 안에 있는 "email"에 접근
        Map<String, Object> kakaoAccount = (Map<String, Object>) attribute.get("kakao_account");
        if (kakaoAccount != null) {
            return kakaoAccount.get("email").toString();
        }
        return null; // email이 없을 경우 null 반환
    }

    @Override
    public String getName() {
        // "properties" 안에 있는 "nickname"에 접근
        Map<String, Object> properties = (Map<String, Object>) attribute.get("properties");
        if (properties != null) {
            return properties.get("nickname").toString();
        }
        return null; // name이 없을 경우 null 반환
    }
}
