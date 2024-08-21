package com.o2b2.devbox_server.member.entity;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collections;

// 사용자 정보, 인증정보, 권한 정보 제공
public class MemberDetails extends User {

    private Member member;

    public MemberDetails(Member member) {
        super(member.getEmail(), member.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + member.getRole().getRoleName())));
        this.member = member;
    }

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }
}