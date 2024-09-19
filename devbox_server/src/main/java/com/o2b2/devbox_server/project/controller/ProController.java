package com.o2b2.devbox_server.project.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Sort;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.o2b2.devbox_server.project.model.MultiImgEntity;
import com.o2b2.devbox_server.project.model.ProEntity;
import com.o2b2.devbox_server.project.repository.MultiImgRepository;
import com.o2b2.devbox_server.project.repository.ProRepository;
import com.o2b2.devbox_server.user.dto.CustomUserDetails;
import com.o2b2.devbox_server.user.entity.UserEntity;
import com.o2b2.devbox_server.user.repository.UserRepository;

import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@CrossOrigin
@Transactional
public class ProController {

    private final Path fileStorageLocation = Paths.get("c:/images"); // 파일 저장 경로

    @Autowired
    ProRepository proRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MultiImgRepository multiImgRepository;

    @GetMapping("/project/list")
    public Map<String, Object> proList(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "6") int size) {

        Sort sort = Sort.by(Sort.Direction.DESC, "likeCount");
        Pageable pageable = PageRequest.of(page - 1, size, sort); // 페이지 요청 생성

        Page<ProEntity> p = proRepository.findAll(pageable);
        List<ProEntity> list = p.getContent();

        // 페이지네이션 관련 정보 계산
        int totalPage = p.getTotalPages();
        int startPage = (page - 1) / 10 * 10 + 1;
        int endPage = Math.min(startPage + 9, totalPage);

        // 반환할 데이터 구성
        Map<String, Object> response = new HashMap<>();
        response.put("list", list.stream().map(pro -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", pro.getId());
            map.put("title", pro.getTitle());
            map.put("link", pro.getLink());
            map.put("coment", pro.getComent());
            map.put("name", pro.getName());
            map.put("likeCount", pro.getLikeCount());
            map.put("mainImg", pro.getMultiImgEntitys().get(0).getId());
            return map;
        }).collect(Collectors.toList())); // proEntity를 Map으로 변환
        response.put("currentPage", page); // 현재 페이지
        response.put("startPage", startPage); // 시작 페이지
        response.put("endPage", endPage); // 끝 페이지
        response.put("totalPage", totalPage); // 전체 페이지 수

        return response; // JSON 형태로 반환
    }

    @GetMapping("/project/like")
    @ResponseBody
    public Map<String, Object> like(@RequestParam Long id) {
        Map<String, Object> map = new HashMap<>();
        Optional<ProEntity> proOpt = proRepository.findById(id);

        if (proOpt.isPresent()) {
            ProEntity pro = proOpt.get();

            // 좋아요 상태 토글
            if (pro.getLikeCount() == null) {
                pro.setLikeCount(0);

            }

            // 좋아요 수 증가
            pro.setLikeCount(pro.getLikeCount() + 1);

            proRepository.save(pro); // 변경된 상태를 저장

            map.put("likeCount", pro.getLikeCount());
        } else {
            map.put("error", "Message not found");
        }

        return map; // 클라이언트에 map 반환
    }

    @PostMapping("/project/write")
    @ResponseBody
    public Map<String, Object> pro(
            @ModelAttribute ProEntity pro,
            @RequestParam("file") MultipartFile[] files,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        System.out.println(pro);

        // 결과를 담을 맵 생성
        Map<String, Object> map = new HashMap<>();

        // 로그인한 유저 정보에서 UserEntity를 가져옴
        UserEntity user = userDetails.getUserEntity();

        // EduEntity에 UserEntity 설정
        pro.setUserEntity(user);

        // 파일이 첨부되지 않았을 경우 처리
        if (files == null || files.length == 0) {
            map.put("code", 400);
            map.put("pro", "이미지를 자랑해주세요.");
            return map;
        }

        ProEntity result = proRepository.save(pro);

        // 각 파일을 처리하는 반복문
        for (MultipartFile mFile : files) {
            // ProEntity 객체에 이미지 파일 이름 설정
            MultiImgEntity img = new MultiImgEntity();
            img.setImg(mFile.getOriginalFilename());
            img.setProEntity(result);

            // ProEntity 저장
            MultiImgEntity mResult = multiImgRepository.save(img);

            try {
                // 파일을 지정된 경로에 저장
                mFile.transferTo(new File("c:/images/" + mFile.getOriginalFilename()));
            } catch (IllegalStateException | IOException e) {
                e.printStackTrace();

                // 에러 발생 시 에러 메시지를 맵에 추가
                map.put("code", 500);
                map.put("pro", "업로드 중 오류 발생: " + e.getMessage());
                return map; // 에러 발생 시 바로 반환
            }
        }

        // 성공 시 응답 메시지 설정
        map.put("code", 200);
        map.put("pro", "모든 파일 업로드 완료");

        return map; // 결과 반환
    }

    @PostMapping("/project/update")
    public Map<String, Object> update(
            @ModelAttribute ProEntity pro,
            @RequestParam(value = "delImgId", required = false) Long[] imgIds,
            @RequestParam(value = "file", required = false) MultipartFile[] files,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        Map<String, Object> map = new HashMap<>();

        // 로그인한 유저 정보에서 UserEntity를 가져옴
        UserEntity user = userDetails.getUserEntity();

        // EduEntity에 UserEntity 설정
        pro.setUserEntity(user);

        // 데이터베이스에서 기존의 ProEntity를 가져옵니다.
        ProEntity existingpro = proRepository.findById(pro.getId()).orElse(null);

        if (existingpro != null) {
            // 삭제할 이미지 ID 배열이 제공된 경우
            if (imgIds != null && imgIds.length > 0) {
                for (Long imgId : imgIds) {
                    // 데이터베이스에서 해당 이미지를 삭제합니다.
                    MultiImgEntity imgEntity = multiImgRepository.findById(imgId).orElse(null);
                    if (imgEntity != null) {
                        // 파일 시스템에서 이미지 파일 삭제
                        File file = new File("c:/images/" + imgEntity.getImg());
                        if (file.exists()) {
                            file.delete(); // 파일 삭제
                        }

                        // 데이터베이스에서 이미지 엔티티 삭제
                        multiImgRepository.deleteById(imgId);
                    }
                }
            }

            // 파일이 업로드된 경우에 대한 처리
            if (files != null && files.length > 0) {
                for (MultipartFile mFile : files) {
                    // 새로운 MultiImgEntity 객체를 생성하여 파일 정보를 저장합니다.
                    MultiImgEntity img = new MultiImgEntity();
                    img.setImg(mFile.getOriginalFilename());
                    img.setProEntity(existingpro);

                    // MultiImgEntity를 데이터베이스에 저장합니다.
                    MultiImgEntity mResult = multiImgRepository.save(img);

                    try {
                        // 파일을 지정된 경로에 저장합니다.
                        mFile.transferTo(new File("c:/images/" + mFile.getOriginalFilename()));
                    } catch (IllegalStateException | IOException e) {
                        e.printStackTrace();
                        // 파일 저장 중 오류 발생 시 에러 메시지를 맵에 추가합니다.
                        map.put("code", 500);
                        map.put("pro", "파일 업로드 중 오류 발생: " + e.getMessage());
                        return map; // 에러 발생 시 바로 반환합니다.
                    }
                }
            } else {
                // 업로드된 파일이 없는 경우 기존의 이미지 목록을 유지합니다.
                pro.setMultiImgEntitys(existingpro.getMultiImgEntitys());
            }

            // 수정된 ProEntity 객체를 데이터베이스에 저장합니다.
            proRepository.save(pro);

            // 성공 응답을 맵에 추가합니다.
            map.put("code", 200);
            map.put("pro", "수정 완료");

        } else {
            // 기존 ProEntity가 없는 경우의 처리
            map.put("code", 404);
            map.put("pro", "존재하지 않는 데이터입니다.");
        }

        return map; // 수정 완료 응답을 반환합니다.
    }

    @DeleteMapping("/project/delete")
    public Map<String, Object> prodelete(@RequestParam Long Id,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        Map<String, Object> response = new HashMap<>();

        // 프로젝트를 조회
        Optional<ProEntity> projectOpt = proRepository.findById(Id);

        if (projectOpt.isPresent()) {
            ProEntity project = projectOpt.get();

            // 로그인한 유저의 ID와 프로젝트 작성자의 ID를 비교
            if (project.getUserEntity().getId().equals(userDetails.getUserEntity().getId())) {
                // 유저가 일치할 경우 삭제
                proRepository.deleteById(Id);
                response.put("code", 200);
                response.put("msg", "삭제 완료");
            } else {
                // 유저가 일치하지 않을 경우 권한 없음 처리
                response.put("code", 403);
                response.put("msg", "삭제 권한이 없습니다.");
            }
        } else {
            // 해당 ID의 프로젝트가 없을 경우
            response.put("code", 404);
            response.put("msg", "프로젝트를 찾을 수 없습니다.");
        }

        return response;
    }

    @GetMapping("/project/detail")
    @ResponseBody
    public Map<String, Object> proDetail(@RequestParam Long id) {
        Map<String, Object> map = new HashMap<>();

        Optional<ProEntity> proOpt = proRepository.findById(id);

        ProEntity pro = proOpt.get();
        map.put("id", pro.getId());
        map.put("title", pro.getTitle());
        map.put("link", pro.getLink());
        map.put("coment", pro.getComent());
        map.put("name", pro.getName());
        map.put("imgs", pro.getMultiImgEntitys());
        map.put("user", pro.getUserEntity());

        return map;

    }

    @GetMapping("/project/update")
    @ResponseBody
    public Map<String, Object> proUpdate(@RequestParam Long id,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        Map<String, Object> map = new HashMap<>();

        // 프로젝트를 id로 조회
        Optional<ProEntity> proOpt = proRepository.findById(id);

        // 프로젝트가 존재하는지 확인
        if (proOpt.isPresent()) {
            ProEntity pro = proOpt.get();

            // 로그인한 유저와 프로젝트 작성자가 일치하는지 확인
            if (pro.getUserEntity().getId().equals(userDetails.getUserEntity().getId())) {
                // 작성자가 일치할 경우 프로젝트 정보를 반환
                map.put("id", pro.getId());
                map.put("title", pro.getTitle());
                map.put("link", pro.getLink());
                map.put("coment", pro.getComent());
                map.put("name", pro.getName());
                map.put("imgs", pro.getMultiImgEntitys());
                map.put("code", 200); // 성공 코드
            } else {
                // 작성자가 일치하지 않을 경우 권한 없음
                map.put("code", 403);
                map.put("msg", "프로젝트 수정 권한이 없습니다.");
            }
        } else {
            // 프로젝트가 존재하지 않을 경우
            map.put("code", 404);
            map.put("msg", "프로젝트를 찾을 수 없습니다.");
        }

        return map;
    }

    @GetMapping("/project/download")
    public ResponseEntity<Resource> downloadFile(@RequestParam Long id) {
        try {
            Optional<MultiImgEntity> img = multiImgRepository.findById(id);
            String filename = img.get().getImg();
            // 파일 경로 생성
            Path filePath = fileStorageLocation.resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            // 파일이 존재하지 않을 경우 예외 처리
            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            // 파일의 MIME 타입을 추측 (추가 설정 가능)
            String contentType = "application/octet-stream";
            return ResponseEntity.ok()
                    .contentType(org.springframework.http.MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (IOException ex) {
            // 파일 읽기 오류 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
