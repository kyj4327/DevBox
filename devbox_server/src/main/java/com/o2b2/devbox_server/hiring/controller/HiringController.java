package com.o2b2.devbox_server.hiring.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
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
    public List<Map<String, Object>> hiringList(
            @PathVariable("category") String category,
            @RequestParam(value = "page", defaultValue = "1") int page) {
        Sort sort = Sort.by(Order.desc("id"));
        Pageable pageable = PageRequest.of(page - 1, 6, sort);
        Page<Hiring> p = null;
        if (category.equals("All")) {
            p = hiringRepository.findAll(pageable);
        } else if (category.equals("Busan")) {
            p = hiringRepository.findByAreaContaining("부산", pageable);
        } else {
            p = hiringRepository.findByAreaNotContaining("부산", pageable);
        }
        List<Hiring> list = p.getContent();
        List<Map<String, Object>> response = new ArrayList<>();
        for (Hiring h : list) {
            Map<String, Object> rMap = new HashMap<>();
            rMap.put("id", h.getId());
            rMap.put("company", h.getCompany());
            rMap.put("area", h.getArea());
            rMap.put("job", h.getJob());
            rMap.put("career", h.getCareer());
            rMap.put("imgUrl", h.getImgUrl());
            rMap.put("wantedUrl", h.getWantedUrl());
            response.add(rMap);
        }
        int totalPage = p.getTotalPages();
        int startPage = (page - 1) / 10 * 10 + 1;
        int endPage = startPage + 9;
        if (endPage > totalPage) {
            endPage = totalPage;
        }
        Map<String, Object> pMap = new HashMap<>();
        pMap.put("totalPage", totalPage);
        pMap.put("startPage", startPage);
        pMap.put("endPage", endPage);
        pMap.put("currentPage", page);
        response.add(pMap);

        return response;
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
