package com.o2b2.devbox_server.member.service;

import com.o2b2.devbox_server.member.entity.Member;
import com.o2b2.devbox_server.member.entity.PrincipalUser;
import com.o2b2.devbox_server.member.entity.Role;
import com.o2b2.devbox_server.member.repository.MemberRepository;
import com.o2b2.devbox_server.member.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private MemberRepository memberRepository;

    private static final String[] FIRST_WORDS = {"고마운", "귀여운", "기쁜", "깨끗한", "너그러운", "높은", "동그란", "새로운", "멋진", "반가운", "지혜로운", "푸른", "흰", "힘찬", "새로운", "아름다운"};
    private static final String[] SECOND_WORDS = {"소리", "가람", "바람", "빛", "향기", "꿈", "사랑", "이슬", "노래", "바다", "하늘", "산", "나무", "꽃", "달", "별", "강"};

    @Transactional
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        System.out.println("userRequest" + userRequest); // ?

        //userRequestorg.springframework.security.oauth2.client.userinfo.OAuth2UserRequest@355aaf3d
        System.out.println(userRequest.getClientRegistration()); // google~~~
        System.out.println(userRequest.getAccessToken().getTokenValue());
        System.out.println(super.loadUser(userRequest).getAttributes()); //----엑세스토큰 -->요청---email, profile--->


        // 회원가입을 진행하기 위한 정보 추출
        OAuth2User oAuth2User = super.loadUser(userRequest);  // OAuth2User = 유저 정보를 담고 있다.


        String provider = userRequest.getClientRegistration().getRegistrationId(); // google, kakao, naver, github 등
        String providerId = getProviderId(oAuth2User, provider);
        String email = getEmail(oAuth2User, provider);
        String name = getName(oAuth2User, provider);


        // 데이터베이스에 데이터를 저장하기 전에 가입 유무를 확인
        Optional<Member> optional = memberRepository.findByEmail(email);
        Member member;
        if (optional.isPresent()) {
            System.out.println("로그인을 이미 한적이 있습니다. 당신은 자동 회원 가입이 되었습니다");
            member = optional.get();
        } else {
            System.out.println("처음 OAuth2 로그인을 한 사용자 입니다");
            String password = passwordEncoder.encode("임의의값");
//            String name = oAuth2User.getAttribute("name");

            // 랜덤 닉네임 생성
            String nickname = generateRandomNickname();

            // Role 조회 (Optional 사용)
            Role userRole = roleRepository.findByRoleName("USER")
                    .orElseThrow(() -> new RuntimeException("Role not found"));

            member = new Member();
            member.setEmail(email);
            member.setPassword(password);
            member.setName(name);
            member.setNickname(nickname);
            member.setRole(userRole);
            member.setProvider(provider);
            member.setProviderId(providerId);
            memberRepository.save(member);
        }
        return new PrincipalUser(member);
    }

    private String getProviderId(OAuth2User oAuth2User, String provider) {
        if (provider.equals("kakao")) {
            return oAuth2User.getAttribute("id").toString();
        } else if (provider.equals("naver")) {
            Map<String, Object> response = (Map<String, Object>) oAuth2User.getAttribute("response");
            return response.get("id").toString();
        } else if (provider.equals("github")) {
            return oAuth2User.getAttribute("id").toString();
        } else {
            return oAuth2User.getAttribute("sub");
        }
    }

    private String getEmail(OAuth2User oAuth2User, String provider) {
        if (provider.equals("kakao")) {
            Map<String, Object> kakaoAccount = (Map<String, Object>) oAuth2User.getAttribute("kakao_account");
            return kakaoAccount.get("email").toString();
        } else if (provider.equals("naver")) {
            Map<String, Object> response = (Map<String, Object>) oAuth2User.getAttribute("response");
            return response.get("email").toString();
        } else if (provider.equals("github")) {
            String email = oAuth2User.getAttribute("email");
//            if (email == null) {
//                // GitHub에서 이메일이 제공되지 않는 경우, 예외를 처리하거나 기본값 설정
//                email = "default@example.com"; // 임의의 기본 이메일
//            }
            return email;
        } else {
            return oAuth2User.getAttribute("email");
        }
    }
    private String getName(OAuth2User oAuth2User, String provider) {
        if (provider.equals("kakao")) {
            Map<String, Object> properties = (Map<String, Object>) oAuth2User.getAttribute("properties");
            return properties != null ? (String) properties.get("nickname") : "Unknown";
        } else if (provider.equals("naver")) {
            Map<String, Object> response = (Map<String, Object>) oAuth2User.getAttribute("response");
            return response != null ? (String) response.get("name") : "Unknown";
        } else {
            return oAuth2User.getAttribute("name");
        }
    }

    // 닉네임 자동 조합
    private String generateRandomNickname() {
        Random random = new Random();
        String firstWord = FIRST_WORDS[random.nextInt(FIRST_WORDS.length)];
        String secondWord = SECOND_WORDS[random.nextInt(SECOND_WORDS.length)];
        return firstWord + secondWord;
    }
}