package com.o2b2.devbox_server.eduInfo.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.o2b2.devbox_server.eduInfo.dto.EduData;
import com.o2b2.devbox_server.eduInfo.model.EduEntity;
import com.o2b2.devbox_server.eduInfo.repository.EduRepository;

import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@CrossOrigin
@Transactional
public class EduController {

    @Autowired
    EduRepository eduRepository;

    @PostMapping("/edu")
    public Map<String, Object> edu(
            @ModelAttribute EduEntity edu,
            @RequestParam("file") MultipartFile file) {
        System.out.println(edu);
        System.out.println(file.getOriginalFilename());

        Map<String, Object> map = new HashMap<>();

        edu.setImg(file.getOriginalFilename());
        EduEntity result = eduRepository.save(edu);

        try {
            file.transferTo(new File("c:/images/" + file.getOriginalFilename()));
        } catch (IllegalStateException | IOException e) {
            e.printStackTrace();
        }
        map.put("code", 200);
        map.put("msg", "가입완료");

        return map;
    }

    @GetMapping("/edu/list")
    @ResponseBody
    public List<Map<String, Object>> eduList() {

        List<Map<String, Object>> list = new ArrayList<>();
        Map<String, Object> map = new HashMap<>();
        map.put("title", "1번 제목");
        map.put("desc", "1번 내용");
        list.add(map);

        map = new HashMap<>();
        map.put("title", "2번 제목");
        map.put("desc", "2번 내용");
        list.add(map);

        return list;
    }

    @GetMapping("/edu/detail")
    @ResponseBody
    public Map<String, Object> eduDetail() {

        Map<String, Object> map = new HashMap<>();
        map.put("title", "1번 제목2222");
        map.put("desc", "1번 내용22222");
        map.put("imagePath", "http://localhost:8080/1.webp");

        return map;
    }

}
