package com.o2b2.devbox_server.member.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import java.util.Set;


public class PrincipalUser extends User implements OAuth2User {
    private Member member;

    public PrincipalUser(Member member) {
        // email을 사용하여 User 생성자 호출
        super(member.getEmail(), member.getPassword(), getAuthorities(member.getRole()));
        this.member = member;
    }

    public static Collection<? extends GrantedAuthority> getAuthorities(Role role) {
        return new ArrayList<>(Set.of(new SimpleGrantedAuthority("ROLE_" + role.getRoleName())));
    }

    @Override
    public Map<String, Object> getAttributes() {
        return null; // OAuth2User에서 제공하는 사용자 속성을 여기에 반환할 수 있습니다.
    }

    @Override
    public String getName() {
        return member.getName(); // 사용자의 이름을 반환합니다.
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }
}