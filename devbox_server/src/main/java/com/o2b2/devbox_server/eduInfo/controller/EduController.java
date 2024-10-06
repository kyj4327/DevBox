package com.o2b2.devbox_server.eduInfo.controller;

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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Sort;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.o2b2.devbox_server.eduInfo.model.EduEntity;
import com.o2b2.devbox_server.eduInfo.repository.EduRepository;
import com.o2b2.devbox_server.user.repository.UserRepository;

import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

@RestController
@CrossOrigin
@Transactional
public class EduController {

//    private final Path fileStorageLocation = Paths.get("c:/images"); // 파일 저장 경로

    // S3 파일 URL 생성 메서드
    private String getS3FileUrl(String filename) {
        return String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, region, filename);
    }

    // 고유한 파일명을 생성하는 메서드
    private String generateUniqueFilename(String originalFilename) {
        String fileExtension = "";
        int dotIndex = originalFilename.lastIndexOf('.');
        if (dotIndex > 0) {
            fileExtension = originalFilename.substring(dotIndex); // 확장자 추출
            originalFilename = originalFilename.substring(0, dotIndex); // 확장자를 제외한 파일명
        }
        String uniqueFilename = originalFilename + "_" + System.currentTimeMillis() + fileExtension; // 타임스탬프 추가
        return uniqueFilename;
    }

    @Value("${aws.s3.bucket}")
    private String bucketName;

    @Value("${aws.region}")
    private String region;

    @Value("${aws.accessKeyId}")
    private String accessKeyId;

    @Value("${aws.secretKey}")
    private String secretKey;

    private final S3Client s3Client;


    @Autowired
    EduRepository eduRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    public EduController(
            @Value("${aws.accessKeyId}") String accessKeyId,
            @Value("${aws.secretKey}") String secretKey,
            @Value("${aws.region}") String region) {
        this.s3Client = S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create(accessKeyId, secretKey)))
                .build();
    }

    @GetMapping("/edu/list/{state}")
    public Map<String, Object> eduList(
            @PathVariable("state") String state,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "9") int size,
            @RequestParam(value = "search", required = false) String search) {

        System.out.println(state);

        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        Pageable pageable = PageRequest.of(page - 1, size, sort); // 페이지 요청 생성

        Page<EduEntity> p = eduRepository.findByState(state, pageable);
        List<EduEntity> list = p.getContent();
        // 페이지네이션 관련 정보 계산
        int totalPage = p.getTotalPages();
        int startPage = (page - 1) / 10 * 10 + 1;
        int endPage = Math.min(startPage + 9, totalPage);

        // 반환할 데이터 구성
        Map<String, Object> response = new HashMap<>();
        response.put("list", list.stream().map(edu -> {
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
        }).collect(Collectors.toList())); // EduEntity를 Map으로 변환
        response.put("currentPage", page); // 현재 페이지
        response.put("startPage", startPage); // 시작 페이지
        response.put("endPage", endPage); // 끝 페이지
        response.put("totalPage", totalPage); // 전체 페이지 수

        return response; // JSON 형태로 반환
    }

    @PostMapping("/edu/write")
    public Map<String, Object> edu(
            @ModelAttribute EduEntity edu,
            @RequestParam("file") MultipartFile file) {
        System.out.println(edu);
        System.out.println(file.getOriginalFilename());

        Map<String, Object> map = new HashMap<>();

        // 파일이 첨부되지 않았을 경우 처리
        if (file == null || file.isEmpty()) {
            map.put("code", 400);
            map.put("msg", "포스터를 첨부해주세요.");
            return map;
        }

        // 고유한 파일명 생성
        String originalFilename = file.getOriginalFilename();
        String uniqueFilename = generateUniqueFilename(originalFilename); // 고유한 파일명 생성

        // EduEntity에 고유한 파일명 설정
        edu.setImg(uniqueFilename);
        EduEntity result = eduRepository.save(edu);

//        try {
//            // 파일을 지정된 경로에 고유한 파일명으로 저장
//            file.transferTo(new File("c:/images/" + uniqueFilename));
//        } catch (IllegalStateException | IOException e) {
//            e.printStackTrace();
//            map.put("code", 500);
//            map.put("msg", "업로드 중 오류 발생: " + e.getMessage());
//            return map;
//        }
//
//        map.put("code", 200);
//        map.put("msg", "업로드 완료");
//
//        return map;
//    }

    // AWS_S3 이용
        try {
            // S3에 파일 업로드
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(uniqueFilename)
                    .contentType(file.getContentType())
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));
        } catch (S3Exception | IOException e) {
            e.printStackTrace();
            map.put("code", 500);
            map.put("msg", "업로드 중 오류 발생: " + e.getMessage());
            return map;
        }

        map.put("code", 200);
        map.put("msg", "업로드 완료");

        return map;
    }


    @PostMapping("/edu/update")
    public Map<String, Object> update(
            @ModelAttribute EduEntity edu,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        System.out.println(edu);

        Map<String, Object> map = new HashMap<>();

        // 데이터베이스에서 기존의 EduEntity를 가져옴
        EduEntity existingEdu = eduRepository.findById(edu.getId()).orElse(null);

        if (existingEdu != null) {
            // 파일이 새로 업로드되지 않은 경우 기존 파일 이름 유지
            if (file != null && !file.isEmpty()) {
                // 고유한 파일명을 생성하여 파일 이름 설정
                String originalFilename = file.getOriginalFilename();
                String uniqueFilename = generateUniqueFilename(originalFilename); // 고유한 파일명 생성

                edu.setImg(uniqueFilename);

//                try {
//                    // 새로운 파일을 지정된 경로에 저장 (고유한 파일명으로)
//                    file.transferTo(new File("c:/images/" + uniqueFilename));
//                } catch (IllegalStateException | IOException e) {
//                    e.printStackTrace(); // 파일 저장 중 오류 발생 시 스택 트레이스 출력
//                    map.put("code", 500);
//                    map.put("msg", "파일 업로드 중 오류 발생: " + e.getMessage());
//                    return map; // 오류 발생 시 바로 반환
//                }
//            } else {
//                // 파일이 없으면 기존의 파일 이름 유지
//                edu.setImg(existingEdu.getImg());
//            }
//
//            // EduEntity 객체를 데이터베이스에 저장
//            eduRepository.save(edu);
//
//            // 응답 맵에 성공 코드와 메시지 추가
//            map.put("code", 200);
//            map.put("msg", "수정 완료");
//
//        } else {
//            // 기존 EduEntity가 없는 경우 처리
//            map.put("code", 404);
//            map.put("msg", "존재하지 않는 데이터입니다.");
//        }
//
//        return map; // 수정 완료 응답 반환
//    }
                try {
                    // 새로운 파일을 S3에 업로드
                    PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                            .bucket(bucketName)
                            .key(uniqueFilename)
                            .contentType(file.getContentType())
                            .build();

                    s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));

                    // 기존 파일을 S3에서 삭제
                    DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                            .bucket(bucketName)
                            .key(existingEdu.getImg())
                            .build();
                    s3Client.deleteObject(deleteObjectRequest);

                } catch (S3Exception | IOException e) {
                    e.printStackTrace(); // 파일 저장 중 오류 발생 시 스택 트레이스 출력
                    map.put("code", 500);
                    map.put("msg", "파일 업로드 중 오류 발생: " + e.getMessage());
                    return map; // 오류 발생 시 바로 반환
                }
            } else {
                // 파일이 없으면 기존의 파일 이름 유지
                edu.setImg(existingEdu.getImg());
            }

            // EduEntity 객체를 데이터베이스에 저장
            eduRepository.save(edu);

            // 응답 맵에 성공 코드와 메시지 추가
            map.put("code", 200);
            map.put("msg", "수정 완료");

        } else {
            // 기존 EduEntity가 없는 경우 처리
            map.put("code", 404);
            map.put("msg", "존재하지 않는 데이터입니다.");
        }

        return map; // 수정 완료 응답 반환
    }

//    @DeleteMapping("/edu/delete")
//    public String edudelete(@RequestParam Long Id) {
//        eduRepository.deleteById(Id);
//        return "삭제 완료";
//    }

    @DeleteMapping("/edu/delete")
    public Map<String, Object> edudelete(@RequestParam Long Id) {
        Map<String, Object> response = new HashMap<>();

        Optional<EduEntity> eduOpt = eduRepository.findById(Id);

        if (eduOpt.isPresent()) {
            EduEntity edu = eduOpt.get();

            try {
                // S3에서 이미지 파일 삭제
                DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                        .bucket(bucketName)
                        .key(edu.getImg())
                        .build();
                s3Client.deleteObject(deleteObjectRequest);

                // 데이터베이스에서 EduEntity 삭제
                eduRepository.deleteById(Id);

                response.put("code", 200);
                response.put("msg", "삭제 완료");
            } catch (S3Exception e) {
                e.printStackTrace();
                response.put("code", 500);
                response.put("msg", "S3에서 파일 삭제 중 오류 발생: " + e.getMessage());
            }
        } else {
            response.put("code", 404);
            response.put("msg", "존재하지 않는 데이터입니다.");
        }

        return response;
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

        //        map.put("img", edu.getImg());
        map.put("img", getS3FileUrl(edu.getImg())); // S3 URL로 변경

        map.put("recruit", edu.getRecruit());
        map.put("eduterm", edu.getEduterm());
        map.put("people", edu.getPeople());
        map.put("link", edu.getLink());
        map.put("logo", edu.getLogo());
        map.put("state", edu.getState());

        return map;

    }

    @GetMapping("/edu/update")
    @ResponseBody
    public Map<String, Object> eduUpdate(@RequestParam Long id) {
        Map<String, Object> map = new HashMap<>();

        // id로 데이터베이스에서 교육 정보를 조회합니다.
        Optional<EduEntity> eduOpt = eduRepository.findById(id);

        EduEntity edu = eduOpt.get();
        map.put("id", edu.getId());
        map.put("title", edu.getTitle());
        map.put("subtitle", edu.getSubtitle());

//        map.put("img", edu.getImg());
        map.put("img", getS3FileUrl(edu.getImg())); // S3 URL로 변경

        map.put("recruit", edu.getRecruit());
        map.put("eduterm", edu.getEduterm());
        map.put("people", edu.getPeople());
        map.put("link", edu.getLink());
        map.put("logo", edu.getLogo());
        map.put("state", edu.getState());

        return map;

    }

    @GetMapping("/edu/download")
    public ResponseEntity<Resource> downloadFile(@RequestParam Long id) {
//        try {
//            Optional<EduEntity> opt = eduRepository.findById(id);
//            String filename = opt.get().getImg();
//            // 파일 경로 생성
//            Path filePath = fileStorageLocation.resolve(filename).normalize();
//            Resource resource = new UrlResource(filePath.toUri());
//
//            // 파일이 존재하지 않을 경우 예외 처리
//            if (!resource.exists()) {
//                return ResponseEntity.notFound().build();
//            }
//
//            // 파일의 MIME 타입을 추측 (추가 설정 가능)
//            String contentType = "application/octet-stream";
//            return ResponseEntity.ok()
//                    .contentType(org.springframework.http.MediaType.parseMediaType(contentType))
//                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
//                    .body(resource);
//        } catch (IOException ex) {
//            // 파일 읽기 오류 처리
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
        try {
            Optional<EduEntity> opt = eduRepository.findById(id);
            if (!opt.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            EduEntity edu = opt.get();
            String filename = edu.getImg();

            // S3에서 파일의 URL 생성
            String fileUrl = getS3FileUrl(filename);

            // 클라이언트가 파일을 직접 다운로드하도록 리다이렉트
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.LOCATION, fileUrl);
            return new ResponseEntity<>(headers, HttpStatus.FOUND);

        } catch (Exception ex) {
            // 파일 읽기 오류 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
