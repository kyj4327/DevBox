package com.o2b2.devbox_server.eduInfo.controller;

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
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
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

    private final Path fileStorageLocation = Paths.get("c:/images"); // 파일 저장 경로


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
    
    @GetMapping("/edu/delete")
    public String edudelete(@RequestParam Long Id) {
        eduRepository.deleteById(Id);
        return "삭제 완료";
    }


    @GetMapping("/edu/detail")
    @ResponseBody
    public Map<String, Object> eduDetail(@RequestParam Long id) {
        Map<String, Object> map = new HashMap<>();

        // id로 데이터베이스에서 교육 정보를 조회합니다.
        Optional<EduEntity> eduOpt = eduRepository.findById(id);

        EduEntity edu = eduOpt.get();
        map.put("id", edu.getId());
        map.put("title", edu.getTitle());
        map.put("subtitle", edu.getSubtitle());
        map.put("img", edu.getImg());
        map.put("recruit", edu.getRecruit());
        map.put("eduterm", edu.getEduterm());
        map.put("people", edu.getPeople());
        map.put("link", edu.getLink());
        map.put("logo", edu.getLogo());

        return map;

    }

    @GetMapping("/edu/list")
    public List<Map<String, Object>> eduList() {
        // 데이터베이스에서 모든 EduEntity 객체를 조회합니다.
        List<EduEntity> eduList = eduRepository.findAll();

        // EduEntity 목록을 Map 목록으로 변환합니다.
        return eduList.stream()
                .map(edu -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", edu.getId());
                    map.put("title", edu.getTitle());
                    map.put("subtitle", edu.getSubtitle());
                    map.put("img", edu.getImg());
                    map.put("recruit", edu.getRecruit());
                    map.put("eduterm", edu.getEduterm());
                    map.put("people", edu.getPeople());
                    map.put("link", edu.getLink());
                    map.put("logo", edu.getLogo());
                    return map;
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/download")
    public ResponseEntity<Resource> downloadFile(@RequestParam Long id) {
        try {
            Optional<EduEntity> opt = eduRepository.findById(id);
            String filename = opt.get().getImg();
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
