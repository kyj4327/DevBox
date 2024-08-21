package com.o2b2.devbox_server.member.service;

import com.o2b2.devbox_server.member.entity.Member;
import com.o2b2.devbox_server.member.entity.Role;
import com.o2b2.devbox_server.member.repository.MemberRepository;
import com.o2b2.devbox_server.member.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // 회원가입 동작
    public Member memberRegister(Member member) {
        // 1. 패스워드 암호화
        String encodePassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encodePassword);

        // 기본 역할 부여 (예: USER 역할)
        member.setRole(roleRepository.findByRoleName("USER")
                .orElseThrow(() -> new IllegalArgumentException("Role not found: USER")));

        // 회원 정보 저장
        memberRepository.save(member);

        return memberRepository.save(member);
    }
}