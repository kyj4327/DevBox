package com.o2b2.devbox_server.contest.controller;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.o2b2.devbox_server.contest.model.Contest;
import com.o2b2.devbox_server.contest.repository.ContestRepository;

@RestController
@CrossOrigin
public class ContestController {
    @Autowired
    ContestRepository contestRepository;

    @PostMapping("/contest/write")
    public Map<String, Object> contestWrite(@RequestBody Contest contest) {
        Contest result = contestRepository.save(contest);
        Map<String, Object> map = new HashMap<>();
        map.put("code", 200);
        map.put("msg", "입력 완료");
        map.put("result", result);
        return map;
    }

    @GetMapping("/contest/list")
    public List<Map<String, Object>> contestList(
            @RequestParam(value = "page", defaultValue = "1") int page) {
        // 오늘 날짜를 yyyy-MM-dd 형식의 String으로 변환
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String todayString = today.format(formatter);

        Sort sort = Sort.by(Order.asc("regEnd"));
        Pageable pageable = PageRequest.of(page - 1, 6, sort);
        Page<Contest> p = contestRepository.findByRegEndGreaterThanEqual(todayString, pageable);
        List<Contest> list = p.getContent();
        List<Map<String, Object>> response = new ArrayList<>();
        for (Contest c : list) {
            Map<String, Object> cMap = new HashMap<>();
            cMap.put("id", c.getId());
            cMap.put("title", c.getTitle());
            cMap.put("officialUrl", c.getOfficialUrl());
            cMap.put("imgUrl", c.getImgUrl());
            cMap.put("host", c.getHost());
            cMap.put("target", c.getTarget());
            cMap.put("regStart", c.getRegStart());
            cMap.put("regEnd", c.getRegEnd());
            response.add(cMap);
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

    @GetMapping("/contest/delete")
    public String contestDelete(@RequestParam Long contestId) {
        contestRepository.deleteById(contestId);
        return "삭제 완료";
    }

    @GetMapping("/contest/update")
    public Map<String, Object> contestUpdate(@RequestParam Long contestId) {
        Optional<Contest> opt = contestRepository.findById(contestId);
        Contest contest = opt.get();
        Map<String, Object> map = new HashMap<>();
        map.put("id", contest.getId());
        map.put("title", contest.getTitle());
        map.put("officialUrl", contest.getOfficialUrl());
        map.put("imgUrl", contest.getImgUrl());
        map.put("host", contest.getHost());
        map.put("target", contest.getTarget());
        map.put("regStart", contest.getRegStart());
        map.put("regEnd", contest.getRegEnd());
        return map;
    }

    @PostMapping("/contest/update")
    public Map<String, Object> contestUpdate(@RequestBody Contest contest) {
        Contest result = contestRepository.save(contest);
        Map<String, Object> map = new HashMap<>();
        map.put("code", 200);
        map.put("msg", "입력 완료");
        map.put("result", result);
        return map;
    }

}
