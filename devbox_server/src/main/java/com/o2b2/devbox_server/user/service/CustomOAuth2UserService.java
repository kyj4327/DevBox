package com.o2b2.devbox_server.user.service;


import com.o2b2.devbox_server.user.dto.*;
import com.o2b2.devbox_server.user.entity.UserEntity;
import com.o2b2.devbox_server.user.repository.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    private static final String[] FIRST_WORDS = {"고마운", "귀여운", "기쁜", "깨끗한", "너그러운", "높은", "동그란", "새로운", "멋진", "반가운", "지혜로운", "푸른", "흰", "힘찬", "새로운", "아름다운"};
    private static final String[] SECOND_WORDS = {"소리", "가람", "바람", "빛", "향기", "꿈", "사랑", "이슬", "노래", "바다", "하늘", "산", "나무", "꽃", "달", "별", "강"};


    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);

        // google, naver, ... 어디에서 온 아이디인지 확인.
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;
        if (registrationId.equals("naver")) {

            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
        } else if (registrationId.equals("google")) {
            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
        } else if (registrationId.equals("kakao")) {
            oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());

        } else {
            return null;
        }
        String email = oAuth2Response.getEmail();
        UserEntity existData = userRepository.findByEmail(email);

        // 한번도 로그인 한적 없는 경우 -> 회원가입
        if (existData == null) {

            // 랜덤 닉네임 생성
            String nickname = generateUniqueRandomNickname();
            String provider = userRequest.getClientRegistration().getRegistrationId(); // google, kakao, naver
//            String providerId = oAuth2User.getAttribute("id").toString();

            UserEntity userEntity = new UserEntity();
            userEntity.setEmail(email);
            userEntity.setName(oAuth2Response.getName());
            userEntity.setRole("ROLE_USER");
            userEntity.setNickname(nickname);
            userEntity.setProvider(provider);
//            userEntity.setProviderId(providerId);

            userRepository.save(userEntity);

            UserDTO userDTO = new UserDTO();
            userDTO.setEmail(email);
            userDTO.setName(oAuth2Response.getName());
            userDTO.setRole("ROLE_USER");
            userDTO.setNickname(nickname);
            userDTO.setProvider(provider);

            return new CustomOAuth2User(userDTO);
        }
        else {

            existData.setEmail(oAuth2Response.getEmail());
            existData.setName(oAuth2Response.getName());

            //  이미 존재하는 유저라도 로그인시 업데이트가 진행됩니다
            //  (해당 이유는 소셜 로그인 제공자 측에서 닉네임, 프로필 사진의 값이 변경될 수 있기 때문에 로그인마다 업데이트)
            userRepository.save(existData);

            UserDTO userDTO = new UserDTO();
            userDTO.setEmail(existData.getEmail()); // email 설정 추가
            userDTO.setName(oAuth2Response.getName());
            userDTO.setRole(existData.getRole());
            userDTO.setNickname(existData.getNickname()); // nickname 설정 추가

            return new CustomOAuth2User(userDTO);

        }
    }
    // 중복되지 않는 닉네임 생성
    private String generateUniqueRandomNickname() {
        String nickname;
        do {
            nickname = generateRandomNickname();
        } while (userRepository.findByNickname(nickname) != null);
        return nickname;
    }

    // 닉네임 자동 조합
    private String generateRandomNickname() {
        Random random = new Random();
        String firstWord = FIRST_WORDS[random.nextInt(FIRST_WORDS.length)];
        String secondWord = SECOND_WORDS[random.nextInt(SECOND_WORDS.length)];
        return firstWord + secondWord;
    }
}
