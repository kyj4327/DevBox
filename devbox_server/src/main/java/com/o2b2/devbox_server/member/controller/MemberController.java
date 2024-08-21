package com.o2b2.devbox_server.member.controller;

import com.o2b2.devbox_server.member.entity.Member;
import com.o2b2.devbox_server.member.entity.MemberDetails;
import com.o2b2.devbox_server.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @GetMapping("/memberRegister")
    public String memberRegister(){

        return "member/register";
    }

    @PostMapping("/memberRegister")
    public String memberRegisterPost(Member member){
        memberService.memberRegister(member);

        return "redirect:/";
    }

}
