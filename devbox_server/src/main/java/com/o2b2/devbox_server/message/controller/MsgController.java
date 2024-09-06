package com.o2b2.devbox_server.message.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ssl.SslProperties.Bundles.Watch.File;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
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

import jakarta.transaction.Transactional;

import java.time.LocalDateTime;

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
        


        // Sort sort = Sort.by(Sort.Direction.ASC, "id");
        Direction dir = Direction.ASC;
        Pageable pageable = PageRequest.of(page - 1, size, dir, "order", "id"); // 페이지 요청 생성

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
            map.put("like", msg.getLike());
            map.put("order", msg.getOrder());
            return map;
        }).collect(Collectors.toList())); // MsgEntity를 Map으로 변환
        response.put("currentPage", page); // 현재 페이지
        response.put("startPage", startPage); // 시작 페이지
        response.put("endPage", endPage); // 끝 페이지
        response.put("totalPage", totalPage); // 전체 페이지 수

        return response; // JSON 형태로 반환
    }

    @GetMapping("/msg/like")
    @ResponseBody
    public Map<String, Object> like(@RequestParam Long id) {
        Map<String, Object> map = new HashMap<>();
        Optional<MsgEntity> msgOpt = msgRepository.findById(id);

        if (msgOpt.isPresent()) {
            MsgEntity msg = msgOpt.get();


            // 좋아요 상태 토글 (좋아요가 없으면 추가하고, 있으면 삭제)
            if (msg.getLike() == null || !msg.getLike()) {
                msg.setLike(true); // 좋아요 추가
                
                msg.setOrder(1);
            } else {
                msg.setLike(false); // 좋아요 취소
                msg.setOrder(0);
            }

            msgRepository.save(msg); // 변경된 상태를 저장
            
            map.put("like", msg.getLike());
        } else {
            map.put("error", "Message not found");
        }

        return map; // 클라이언트에 map 반환
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

    @GetMapping("/msg/reply")
    @ResponseBody
    public Map<String, Object> reply(@RequestParam Long id) {
        Map<String, Object> map = new HashMap<>();

        Optional<MsgEntity> msgOpt = msgRepository.findById(id);

        MsgEntity msg = msgOpt.get();
        map.put("id", msg.getId());
        map.put("sender", msg.getSender());
        map.put("reciver", msg.getReciver());

        return map;

    }
    
    @GetMapping("/msg/bell")
    @ResponseBody
    public Map<String, Object> reply(@RequestParam String reciver) {
        Map<String, Object> map = new HashMap<>();

        // reciver로 메시지를 조회하여 리스트로 반환
        List<MsgEntity> msgList = msgRepository.findByReciver(reciver);

        // 메시지가 존재하는지 확인
        if (!msgList.isEmpty()) {
            // 메시지 리스트를 가공하여 응답에 포함
            List<Map<String, Object>> responseList = msgList.stream().map(msg -> {
                Map<String, Object> msgMap = new HashMap<>();
                msgMap.put("readTime", msg.getReadTime());
                msgMap.put("reciver", msg.getReciver());
                return msgMap;
            }).collect(Collectors.toList());

            // 응답에 메시지 리스트를 포함
            map.put("messages", responseList);
        } else {
            // 수신자(reciver)로 조회된 메시지가 없을 경우 처리
            map.put("message", "No messages found for the given receiver.");
        }

        return map;
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

        // id로 데이터베이스에서 쪽지 정보를 조회합니다.
        Optional<MsgEntity> msgOpt = msgRepository.findById(id);

        if (msgOpt.isPresent()) {
            MsgEntity msg = msgOpt.get();

            // readTime이 null이면 현재 시간을 읽은 시간으로 설정하고 저장합니다.
            if (msg.getReadTime() == null) {
                msg.setReadTime(LocalDateTime.now());
                msgRepository.save(msg); // 데이터베이스에 저장
            }

            // 쪽지의 세부 정보를 map에 담습니다.
            map.put("id", msg.getId());
            map.put("title", msg.getTitle());
            map.put("content", msg.getContent());
            map.put("sender", msg.getSender());
            map.put("sendTime", msg.getSendTime());
            map.put("reciver", msg.getReciver());
            map.put("readTime", msg.getReadTime()); // 읽은 시간도 응답에 포함
        } else {
            // id에 해당하는 쪽지가 없을 경우 빈 map을 반환하거나 에러 처리를 할 수 있습니다.
            map.put("error", "Message not found");
        }

        return map; // 클라이언트에 map 반환
    }

  
}
