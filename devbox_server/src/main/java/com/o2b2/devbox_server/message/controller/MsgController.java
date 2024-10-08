package com.o2b2.devbox_server.message.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.o2b2.devbox_server.message.model.MsgEntity;
import com.o2b2.devbox_server.message.model.MsgReciverEntity;
import com.o2b2.devbox_server.message.model.MsgSenderEntity;
import com.o2b2.devbox_server.message.repository.MsgReciverRepository;
import com.o2b2.devbox_server.message.repository.MsgSenderRepository;
import com.o2b2.devbox_server.user.dto.CustomUserDetails;
import com.o2b2.devbox_server.user.entity.UserEntity;
import com.o2b2.devbox_server.user.repository.UserRepository;

import jakarta.transaction.Transactional;

import java.time.LocalDateTime;

@RestController
@CrossOrigin
@Transactional
public class MsgController {
    @Autowired
    MsgReciverRepository msgReciverRepository;

    @Autowired
    MsgSenderRepository msgSenderRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/msg/box")
    public Map<String, Object> msgList(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam(value = "category") String category,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "6") int size) {

        Direction dir = Direction.DESC;
        Pageable pageable;

        Page<MsgEntity> p;

        if (category.equals("중요쪽지")) {
            // 중요쪽지: 받은 쪽지와 보낸 쪽지에서 좋아요(like)가 true인 쪽지들 조회
            pageable = PageRequest.of(page - 1, size, dir, "sendTime");

            // 받은 쪽지에서 like가 true인 쪽지 조회
            Page<MsgReciverEntity> receivedLikedMsgs = msgReciverRepository
                    .findByReceiverAndLikeIsTrue(userDetails.getUserEntity(), pageable);

            // 보낸 쪽지에서 like가 true인 쪽지 조회
            Page<MsgSenderEntity> sentLikedMsgs = msgSenderRepository
                    .findBySenderAndLikeIsTrue(userDetails.getUserEntity(), pageable);

            // 두 결과를 하나의 리스트로 합침 (MsgEntity로 캐스팅)
            List<MsgEntity> combinedLikedMsgs = new ArrayList<>();
            combinedLikedMsgs.addAll(
                    receivedLikedMsgs.getContent().stream().map(msg -> (MsgEntity) msg).collect(Collectors.toList())); // 받은
                                                                                                                       // 쪽지의
                                                                                                                       // 내용
                                                                                                                       // 추가
            combinedLikedMsgs.addAll(
                    sentLikedMsgs.getContent().stream().map(msg -> (MsgEntity) msg).collect(Collectors.toList())); // 보낸
                                                                                                                   // 쪽지의
                                                                                                                   // 내용
                                                                                                                   // 추가

            // 페이징 처리를 위해 PageImpl 사용 (Spring Data에서 제공하는 Page 구현체)
            p = new PageImpl<>(
                    combinedLikedMsgs,
                    pageable,
                    (int) (receivedLikedMsgs.getTotalElements() + sentLikedMsgs.getTotalElements()));
        } else {
            // 기존 받은쪽지 또는 보낸쪽지 처리
            pageable = PageRequest.of(page - 1, size, dir, "sendTime");

            if (category.equals("받은쪽지")) {
                // 받은 쪽지 조회
                p = msgReciverRepository.findByReceiver(userDetails.getUserEntity(), pageable);
            } else {
                // 보낸 쪽지 조회
                p = msgSenderRepository.findBySender(userDetails.getUserEntity(), pageable);
            }
        }

        // 결과에서 리스트 가져오기
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

            // sender가 null일 경우 처리
            if (msg.getSender() != null) {
                map.put("sender", msg.getSender().getNickname());
            } else {
                map.put("sender", "탈퇴한 회원"); // 대체 값
            }

            map.put("sendTime", msg.getSendTime());
            // 받은 사람의 readTime을 MsgReciverEntity에서 가져옴
            Optional<MsgReciverEntity> reciverOpt = msgReciverRepository.findById(msg.getId());
            if (reciverOpt.isPresent()) {
                MsgReciverEntity reciverMsg = reciverOpt.get();
                map.put("readTime", reciverMsg.getReadTime()); // Reciver의 읽은 시간
            } else {
                map.put("readTime", null); // 받은 사람이 읽지 않았거나 쪽지가 존재하지 않음
            }

            // receiver가 null일 경우 처리
            if (msg.getReceiver() != null) {
                map.put("reciver", msg.getReceiver().getNickname());
            } else {
                map.put("reciver", "탈퇴한 회원"); // 대체 값
            }

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
    public Map<String, Object> like(@RequestParam Long id, @RequestParam String type) {
        Map<String, Object> map = new HashMap<>();

        if (type.equals("received")) {
            Optional<MsgReciverEntity> msgOpt = msgReciverRepository.findById(id);

            if (msgOpt.isPresent()) {
                MsgReciverEntity msg = msgOpt.get();

                // 좋아요 상태 토글
                if (msg.getLike() == null || !msg.getLike()) {
                    msg.setLike(true); // 좋아요 추가
                    msg.setOrder(1);
                } else {
                    msg.setLike(false); // 좋아요 취소
                    msg.setOrder(0);
                }

                msgReciverRepository.save(msg); // 변경된 상태를 저장
                map.put("like", msg.getLike());
            } else {
                map.put("error", "Received message not found");
                return map; // 수신자 쪽지가 없으면 여기서 종료
            }
        } else if (type.equals("sent")) {
            Optional<MsgSenderEntity> msgOpt = msgSenderRepository.findById(id);

            if (msgOpt.isPresent()) {
                MsgSenderEntity msg = msgOpt.get();

                // 좋아요 상태 토글
                if (msg.getLike() == null || !msg.getLike()) {
                    msg.setLike(true); // 좋아요 추가
                    msg.setOrder(1);
                } else {
                    msg.setLike(false); // 좋아요 취소
                    msg.setOrder(0);
                }

                msgSenderRepository.save(msg); // 변경된 상태를 저장
                map.put("like", msg.getLike());
            } else {
                map.put("error", "Sent message not found");
                return map; // 발신자 쪽지가 없으면 여기서 종료
            }
        } else if (type.equals("important")) { // 중요쪽지 처리
            // 중요쪽지는 받은쪽지와 보낸쪽지 둘 다에서 처리할 수 있으므로, 두 테이블에서 검색
            Optional<MsgReciverEntity> receivedMsgOpt = msgReciverRepository.findById(id);
            Optional<MsgSenderEntity> sentMsgOpt = msgSenderRepository.findById(id);

            if (receivedMsgOpt.isPresent()) {
                MsgReciverEntity msg = receivedMsgOpt.get();

                // 중요쪽지에서도 좋아요 상태 토글
                if (msg.getLike() != null && msg.getLike()) {
                    msg.setLike(false); // 중요쪽지에서 해제
                    msg.setOrder(0);
                    msgReciverRepository.save(msg); // 상태 저장
                }
                map.put("like", msg.getLike());
            }

            if (sentMsgOpt.isPresent()) {
                MsgSenderEntity msg = sentMsgOpt.get();

                // 중요쪽지에서도 좋아요 상태 토글
                if (msg.getLike() != null && msg.getLike()) {
                    msg.setLike(false); // 중요쪽지에서 해제
                    msg.setOrder(0);
                    msgSenderRepository.save(msg); // 상태 저장
                }
                map.put("like", msg.getLike());
            }

            // 만약 두 옵션 중 어떤 것도 존재하지 않는다면 에러 처리
            if (!receivedMsgOpt.isPresent() && !sentMsgOpt.isPresent()) {
                map.put("error", "Important message not found in either received or sent messages");
                return map; // 중요쪽지에서 해당 메시지를 찾지 못한 경우
            }
        } else {
            map.put("error", "Invalid message type");
        }

        return map; // 클라이언트에 map 반환
    }

    @PostMapping("/msg/write")
    public Map<String, Object> msg(
            @ModelAttribute MsgSenderEntity senderMsg,
            @ModelAttribute MsgReciverEntity reciverMsg,
            @RequestParam("reciver") String reciverNickname, // 받는 사람 nickname
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        // 결과를 담을 맵 생성
        Map<String, Object> map = new HashMap<>();

        // 로그인한 유저의 닉네임 가져오기
        String senderNickname = userDetails.getNickname();

        // 로그인한 유저 정보에서 UserEntity 가져오기
        UserEntity sender = userDetails.getUserEntity();

        // senderMsg와 reciverMsg에 닉네임 설정
        senderMsg.setSender(sender); // MsgSenderEntity에 sender 닉네임 설정
        reciverMsg.setSender(sender); // MsgReciverEntity에 sender 닉네임 설정

        UserEntity receiver = userRepository.findByNickname(reciverNickname);
        // UserEntity를 각각의 메시지 엔티티에 설정
        senderMsg.setReceiver(receiver);
        reciverMsg.setReceiver(receiver);

        try {
            // Sender 정보 저장
            MsgSenderEntity savedSenderMsg = msgSenderRepository.save(senderMsg);

            // Reciver 정보 저장
            MsgReciverEntity savedReciverMsg = msgReciverRepository.save(reciverMsg);

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

        // Reciver 정보 조회
        Optional<MsgReciverEntity> reciverOpt = msgReciverRepository.findById(id);
        if (reciverOpt.isPresent()) {
            MsgReciverEntity reciverMsg = reciverOpt.get();
            map.put("id", reciverMsg.getId());
            map.put("reciver", reciverMsg.getReceiver().getNickname());
            map.put("sender", reciverMsg.getSender().getNickname());
        } else {
            map.put("reciverError", "Receiver message not found");
        }
        return map;
    }

    @GetMapping("/msg/bell")
    @ResponseBody
    public Map<String, Object> reply(@RequestParam String reciver) {
        Map<String, Object> map = new HashMap<>();

        // reciver로 메시지를 조회하여 리스트로 반환
        UserEntity receiver = userRepository.findByNickname(reciver);
        List<MsgReciverEntity> msgList = msgReciverRepository.findByReceiver(receiver);

        // 메시지가 존재하는지 확인
        if (!msgList.isEmpty()) {
            // 메시지 리스트를 가공하여 응답에 포함
            List<Map<String, Object>> responseList = msgList.stream().map(msg -> {
                Map<String, Object> msgMap = new HashMap<>();
                msgMap.put("readTime", msg.getReadTime());
                msgMap.put("reciver", msg.getReceiver().getNickname());
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

    @GetMapping("/msg/detail")
    @ResponseBody
    public Map<String, Object> msgDetail(@RequestParam Long id, @RequestParam int kind) {
        Map<String, Object> map = new HashMap<>();

        if (kind == 0) {

            // Reciver 쪽지 정보 조회
            Optional<MsgReciverEntity> reciverOpt = msgReciverRepository.findById(id);
            if (reciverOpt.isPresent()) {
                MsgReciverEntity reciverMsg = reciverOpt.get();

                // readTime이 null이면 현재 시간을 읽은 시간으로 설정하고 저장합니다.
                if (reciverMsg.getReadTime() == null) {
                    reciverMsg.setReadTime(LocalDateTime.now());
                    msgReciverRepository.save(reciverMsg); // 데이터베이스에 저장
                }

                // Reciver 쪽지의 세부 정보를 map에 담습니다.
                map.put("id", reciverMsg.getId());
                map.put("title", reciverMsg.getTitle());
                map.put("content", reciverMsg.getContent());

                map.put("sender", reciverMsg.getSender() != null ? reciverMsg.getSender().getNickname() : null);

                map.put("sendTime", reciverMsg.getSendTime());
                map.put("reciver", reciverMsg.getReceiver() != null ? reciverMsg.getReceiver().getNickname() : null);
                map.put("readTime", reciverMsg.getReadTime()); // 읽은 시간도 응답에 포함
            } else {
                // Reciver 쪽지가 없을 경우 에러 메시지 추가
                map.put("reciverError", "Receiver message not found");
            }
        } else { // kind 1 (보낸 쪽지함에서 호출)

            // Sender 쪽지 정보 조회
            Optional<MsgSenderEntity> senderOpt = msgSenderRepository.findById(id);
            if (senderOpt.isPresent()) {
                MsgSenderEntity senderMsg = senderOpt.get();

                // Sender 쪽지의 세부 정보를 map에 담습니다.
                map.put("id", senderMsg.getId());
                map.put("title", senderMsg.getTitle());
                map.put("content", senderMsg.getContent());
                map.put("sender", senderMsg.getSender() != null ? senderMsg.getSender().getNickname() : null);
                map.put("sendTime", senderMsg.getSendTime());
                map.put("reciver", senderMsg.getReceiver() != null ? senderMsg.getReceiver().getNickname() : null);
                // reciver 쪽지의 읽은 시간 반영
                Optional<MsgReciverEntity> reciverOpt = msgReciverRepository.findById(id);
                if (reciverOpt.isPresent()) {
                    MsgReciverEntity reciverMsg = reciverOpt.get();
                    map.put("readTime", reciverMsg.getReadTime()); // Reciver의 읽은 시간도 Sender 응답에 포함
                }
            } else {
                // Sender 쪽지가 없을 경우 에러 메시지 추가
                map.put("senderError", "Sender message not found");
            }
        }

        return map; // 클라이언트에 map 반환
    }

    @DeleteMapping("/msg/delete")
    public Map<String, Object> deleteMessage(
            @RequestParam Long id,
            @AuthenticationPrincipal CustomUserDetails userDetails) { // 현재 로그인된 사용자 정보

        Map<String, Object> response = new HashMap<>();

        // 수신자 쪽지 삭제 처리
        Optional<MsgReciverEntity> msgReciverOpt = msgReciverRepository.findById(id);
        if (msgReciverOpt.isPresent()) {
            MsgReciverEntity msgReciver = msgReciverOpt.get();
            // 로그인한 사용자가 수신자인지 확인
            if (msgReciver.getReceiver().getId().equals(userDetails.getUserEntity().getId())) {
                msgReciverRepository.deleteById(id); // 수신 쪽지 삭제
                response.put("code", 200);
                response.put("msg", "수신 쪽지 삭제 완료");
                return response;
            }
        }

        // 송신자 쪽지 삭제 처리
        Optional<MsgSenderEntity> msgSenderOpt = msgSenderRepository.findById(id);
        if (msgSenderOpt.isPresent()) {
            MsgSenderEntity msgSender = msgSenderOpt.get();

            // 로그인한 사용자가 송신자인지 확인
            if (msgSender.getSender().getId().equals(userDetails.getUserEntity().getId())) {
                msgSenderRepository.deleteById(id); // 송신 쪽지 삭제
                response.put("code", 200);
                response.put("msg", "송신 쪽지 삭제 완료");
                return response;
            }
        }

        // 수신자나 송신자 모두 아닐 경우
        response.put("code", 403);
        response.put("msg", "삭제 권한이 없습니다.");

        return response;
    }

}
