package com.o2b2.devbox_server.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MainController {

    @GetMapping("/") // 로그인 페이지 /login
    public String login(@RequestParam(name = "error",required = false) String error,
                        @RequestParam(name = "logout",required = false) String logout,
                        Model model) {
        if(error != null) {
            model.addAttribute("error",true);
        }
        if(logout != null) {
            model.addAttribute("logout",true);
        }
        return "index";
    }

}
