package com.o2b2.devbox_server.message.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.o2b2.devbox_server.message.model.MsgEntity;
import com.o2b2.devbox_server.message.repository.MsgRepository;
import com.o2b2.devbox_server.project.model.MultiImgEntity;
import com.o2b2.devbox_server.project.model.ProEntity;
import java.time.format.DateTimeFormatter;
import jakarta.transaction.Transactional;

@RestController
@CrossOrigin
@Transactional
public class MsgController {
    @Autowired
    MsgRepository msgRepository;

    @GetMapping("/msg/list/{sender}")
    public Map<String, Object> msgList(
            @PathVariable("sender") String sender,
            @RequestParam(value = "category") String category,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "6") int size) {

        System.out.println("Sender: " + sender + ", category: " + category);
        // DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(page - 1, size, sort); // 페이지 요청 생성

        // 카테고리가 받은쪽지이면
        // sender(로그인한사람)로 DB의 receiver 데이터 조회
        Page<MsgEntity> p;
        if (category.equals("받은쪽지")) {
            p = msgRepository.findByReciver(sender, pageable);
        } else { 
            p = msgRepository.findBySender(sender, pageable);
        }

        // 카테고리가 보낸쪽지이면
        // sender(로그인한사람)로 DB의 sender 데이터 조회


        List<MsgEntity> list = p.getContent();

        // 페이지네이션 관련 정보 계산
        int totalPage = p.getTotalPages();
        int startPage = (page - 1) / 10 * 10 + 1;
        int endPage = Math.min(startPage + 9, totalPage);

        // 반환할 데이터 구성
        Map<String, Object> response = new HashMap<>();
        response.put("list", list.stream().map(msg -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", msg.getId());
            map.put("title", msg.getTitle());
            map.put("content", msg.getContent());
            map.put("sender", msg.getSender());
            map.put("sendTime", msg.getSendTime());
            map.put("readTime", msg.getReadTime());
            map.put("reciver", msg.getReciver());
            return map;
        }).collect(Collectors.toList())); // MsgEntity를 Map으로 변환
        response.put("currentPage", page); // 현재 페이지
        response.put("startPage", startPage); // 시작 페이지
        response.put("endPage", endPage); // 끝 페이지
        response.put("totalPage", totalPage); // 전체 페이지 수

        return response; // JSON 형태로 반환
    }

    @PostMapping("/msg")
    public Map<String, Object> msg(@ModelAttribute MsgEntity msg) {
        System.out.println(msg);

        // 결과를 담을 맵 생성
        Map<String, Object> map = new HashMap<>();

        try {
            // MsgEntity 저장
            MsgEntity result = msgRepository.save(msg);

            // 성공 시 응답 메시지 설정
            map.put("code", 200);
            map.put("msg", "메시지가 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();

            // 에러 발생 시 에러 메시지를 맵에 추가
            map.put("code", 500);
            map.put("msg", "저장 중 오류 발생: " + e.getMessage());
        }

        return map; // 결과 반환
    }

    @DeleteMapping("/msg/delete")
    public String msgdelete(@RequestParam Long Id) {
        msgRepository.deleteById(Id);
        return "삭제 완료";
    }

    @GetMapping("/msg/detail")
    @ResponseBody
    public Map<String, Object> msgDetail(@RequestParam Long id) {
        Map<String, Object> map = new HashMap<>();

        // id로 데이터베이스에서 교육 정보를 조회합니다.
        Optional<MsgEntity> msgOpt = msgRepository.findById(id);

        MsgEntity msg = msgOpt.get();
        map.put("id", msg.getId());
        map.put("title", msg.getTitle());
        map.put("content", msg.getContent());
        map.put("sender", msg.getSender());
        map.put("sendTime", msg.getSendTime());
        map.put("reciver", msg.getReciver());

        return map;

    }

}
