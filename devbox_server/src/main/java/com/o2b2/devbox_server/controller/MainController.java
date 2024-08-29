package com.o2b2.devbox_server.controller;

import com.o2b2.devbox_server.user.repository.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
public class MainController {


    private final UserRepository userRepository;

    public MainController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @GetMapping("/")
    public String mainP() {

        return "Main Controller";
    }

    @GetMapping("/my")
    @ResponseBody
    public String myAPI() {

        return "my route";
    }


}

