package com.o2b2.devbox_server.hiring.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.o2b2.devbox_server.hiring.model.Hiring;
import com.o2b2.devbox_server.hiring.repository.HiringRepository;

@RestController
@CrossOrigin
public class HiringController {
    @Autowired
    HiringRepository hiringRepository;

    @PostMapping("/hiring/write")
    public Map<String, Object> hiringWrite(@RequestBody Hiring hiring) {
        Hiring result = hiringRepository.save(hiring);
        Map<String, Object> map = new HashMap<>();
        map.put("code", 200);
        map.put("msg", "입력 완료");
        map.put("result", result);
        return map;
    }

    @GetMapping("/hiring/list/{category}")
    public List<Hiring> hiringList(@PathVariable("category") String category) {
        if (category.equals("All")) {
            List<Hiring> list = hiringRepository.findAll();
            return list;
        } else if (category.equals("Busan")) {
            List<Hiring> list = hiringRepository.findByAreaContaining("부산");
            return list;
        } else {
            List<Hiring> list = hiringRepository.findByAreaNotContaining("부산");
            return list;
        }

    }

    @GetMapping("/hiring/delete")
    public String hiringDelete(@RequestParam Long hiringId) {
        hiringRepository.deleteById(hiringId);
        return "삭제 완료";
    }

    @GetMapping("/hiring/update")
    public Map<String, Object> hiringUpdate(@RequestParam Long hiringId) {
        Optional<Hiring> opt = hiringRepository.findById(hiringId);
        Hiring hiring = opt.get();
        Map<String, Object> map = new HashMap<>();
        map.put("id", hiring.getId());
        map.put("company", hiring.getCompany());
        map.put("area", hiring.getArea());
        map.put("job", hiring.getJob());
        map.put("career", hiring.getCareer());
        map.put("imgUrl", hiring.getImgUrl());
        map.put("wantedUrl", hiring.getWantedUrl());
        return map;
    }

    @PostMapping("/hiring/update")
    public Map<String, Object> hiringUpdate(@RequestBody Hiring hiring) {
        Hiring result = hiringRepository.save(hiring);
        Map<String, Object> map = new HashMap<>();
        map.put("code", 200);
        map.put("msg", "입력 완료");
        map.put("result", result);
        return map;
    }

}
