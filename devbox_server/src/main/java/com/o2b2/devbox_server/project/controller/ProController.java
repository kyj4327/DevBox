package com.o2b2.devbox_server.project.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
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

import com.o2b2.devbox_server.project.dto.MultiImgDto;
import com.o2b2.devbox_server.project.model.MultiImgEntity;
import com.o2b2.devbox_server.project.model.ProEntity;
import com.o2b2.devbox_server.project.model.ProLike;
import com.o2b2.devbox_server.project.repository.MultiImgRepository;
import com.o2b2.devbox_server.project.repository.ProLikeRepository;
import com.o2b2.devbox_server.project.repository.ProRepository;
import com.o2b2.devbox_server.user.dto.CustomUserDetails;
import com.o2b2.devbox_server.user.dto.UserDTO;
import com.o2b2.devbox_server.user.entity.UserEntity;
import com.o2b2.devbox_server.user.repository.UserRepository;

import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import org.springframework.beans.factory.annotation.Value;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

@RestController
@CrossOrigin
@Transactional
public class ProController {

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
    ProRepository proRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MultiImgRepository multiImgRepository;

    @Autowired
    ProLikeRepository proLikeRepository;

    @Autowired
    public ProController(
            @Value("${aws.accessKeyId}") String accessKeyId,
            @Value("${aws.secretKey}") String secretKey,
            @Value("${aws.region}") String region) {
        this.s3Client = S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create(accessKeyId, secretKey)))
                .build();
    }

    @GetMapping("project/mylist")
    public Map<String, Object> promyList(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "6") int size,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

                
        // likeCount는 내림차순(DESC), time은 오름차순(ASC)으로 정렬
        Sort sort = Sort.by(Sort.Order.desc("likeCount"), Sort.Order.desc("time"));

        Pageable pageable = PageRequest.of(page - 1, size, sort); // 페이지 요청 생성
        
         // 로그인한 유저의 닉네임 가져오기
        String currentNickname = userDetails.getNickname();

        Page<ProEntity> p = proRepository.findByUserEntityNickname(currentNickname, pageable);
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
            map.put("time", pro.getTime());
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

    @GetMapping("/project/list")
    public Map<String, Object> proList(
            @RequestParam(value = "category") String category,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "6") int size) {

        Page<ProEntity> p;
        Pageable pageable = PageRequest.of(page - 1, size); // 페이지 요청 생성

        if (category.equals("최신순")) {
            p = proRepository.findByOrderByTimeDesc(pageable);
        } else if (category.equals("인기순")) {
            p = proRepository.findByOrderByLikeCountDescTimeDesc(pageable);
        } else {
            // 카테고리가 유효하지 않으면 예외 처리 또는 기본 동작 정의
            throw new IllegalArgumentException("유효하지 않은 카테고리입니다.");
        }

        // Page<ProEntity> p = proRepository.findAll(pageable);
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
            map.put("time", pro.getTime());
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
    public Map<String, Object> like(@RequestParam Long id, @AuthenticationPrincipal CustomUserDetails userDetails) {
        Map<String, Object> map = new HashMap<>();

        // 로그인한 유저 정보 가져오기
        UserEntity user = userDetails.getUserEntity();

        // 게시물 존재 여부 확인
        Optional<ProEntity> proOpt = proRepository.findById(id);
        if (!proOpt.isPresent()) {
            map.put("error", "Post not found");
            return map;
        }

        ProEntity pro = proOpt.get();

        // 유저가 해당 게시물에 이미 좋아요를 눌렀는지 확인
        Optional<ProLike> likeOpt = proLikeRepository.findByUserAndProEntity(user, pro);

        if (likeOpt.isPresent()) {
            // 이미 좋아요를 눌렀다면 좋아요 취소
            proLikeRepository.delete(likeOpt.get());
            pro.decreaseLikeCount(); // 좋아요 수 감소
        } else {
            // 좋아요 추가
            ProLike newLike = new ProLike();
            newLike.setUser(user);
            newLike.setProEntity(pro);
            proLikeRepository.save(newLike);
            pro.increaseLikeCount(); // 좋아요 수 증가
        }

        // 변경된 좋아요 수 저장
        proRepository.save(pro);

        // 클라이언트에 응답으로 좋아요 수 및 좋아요 상태 반환
        map.put("likeCount", pro.getLikeCount());
        map.put("isLiked", !likeOpt.isPresent()); // 좋아요 상태를 클라이언트에 전달

        return map;
    }

    @GetMapping("/project/like/status")
    @ResponseBody
    public Map<String, Object> getUserLikeStatus(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Map<String, Object> map = new HashMap<>();

        // 로그인한 유저 정보 가져오기
        UserEntity user = userDetails.getUserEntity();

        // 사용자가 좋아요한 게시물 목록 가져오기
        List<ProLike> likes = proLikeRepository.findByUser(user);

        // 사용자가 좋아요한 게시물 ID와 좋아요 수를 응답으로 반환
        List<Map<String, Object>> likedProjects = likes.stream().map(like -> {
            Map<String, Object> likeInfo = new HashMap<>();
            likeInfo.put("proId", like.getProEntity().getId());
            likeInfo.put("likeCount", like.getProEntity().getLikeCount());
            return likeInfo;
        }).collect(Collectors.toList());

        map.put("likedProjects", likedProjects);
        return map;
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

        // ProEntity에 UserEntity 설정
        pro.setUserEntity(user);

        // 파일이 첨부되지 않았을 경우 처리
        if (files == null || files.length == 0) {
            map.put("code", 400);
            map.put("pro", "이미지를 자랑해주세요.");
            return map;
        }

        pro.setTime(LocalDateTime.now());
        
        ProEntity result = proRepository.save(pro);

        // 각 파일을 처리하는 반복문
        for (MultipartFile mFile : files) {
            // 원본 파일의 확장자 추출
            String originalFilename = mFile.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));

            // UUID를 사용하여 고유한 파일명 생성
            String uniqueFilename = UUID.randomUUID().toString() + extension;


          // ProEntity 객체에 이미지 파일 이름 설정
            MultiImgEntity img = new MultiImgEntity();
            img.setImg(uniqueFilename); // 고유한 파일명 설정
            img.setProEntity(result);

            // ProEntity 저장
            MultiImgEntity mResult = multiImgRepository.save(img);
            
//            try {
//                // 파일을 지정된 경로에 저장
//                mFile.transferTo(new File("c:/images/" + uniqueFilename));
//            } catch (IllegalStateException | IOException e) {
//                e.printStackTrace();
//
//                // 에러 발생 시 에러 메시지를 맵에 추가
//                map.put("code", 500);
//                map.put("pro", "업로드 중 오류 발생: " + e.getMessage());
//                return map; // 에러 발생 시 바로 반환
//            }

            try {
                // S3에 파일 업로드
                PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                        .bucket(bucketName)
                        .key(uniqueFilename)
                        .contentType(mFile.getContentType())
                        .build();

                RequestBody requestBody = RequestBody.fromInputStream(mFile.getInputStream(), mFile.getSize());
                s3Client.putObject(putObjectRequest, requestBody);

            } catch (S3Exception | IOException e) {
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
        map.put("id", result.getId());

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

        // ProEntity에 UserEntity 설정
        pro.setUserEntity(user);
        // 데이터베이스에서 기존의 ProEntity를 가져옴
        ProEntity existingpro = proRepository.findById(pro.getId()).orElse(null);

        if (existingpro != null) {
            // 삭제할 이미지 ID 배열이 제공된 경우
            if (imgIds != null && imgIds.length > 0) {
                for (Long imgId : imgIds) {
                    // 데이터베이스에서 해당 이미지를 삭제
                    MultiImgEntity imgEntity = multiImgRepository.findById(imgId).orElse(null);
//                    if (imgEntity != null) {
//                        // 파일 시스템에서 이미지 파일 삭제
//                        File file = new File("c:/images/" + imgEntity.getImg());
//                        if (file.exists()) {
//                            file.delete(); // 파일 삭제
//                        }
//
//                        // 데이터베이스에서 이미지 엔티티 삭제
//                        multiImgRepository.deleteById(imgId);
//                    }
                    if (imgEntity != null) {
                        try {
                            // S3에서 이미지 삭제
                            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                                    .bucket(bucketName)
                                    .key(imgEntity.getImg())
                                    .build();
                            s3Client.deleteObject(deleteObjectRequest);
                        } catch (S3Exception e) {
                            e.printStackTrace();
                            // S3에서 이미지 삭제 실패 시 처리
                            map.put("code", 500);
                            map.put("pro", "S3에서 이미지 삭제 중 오류 발생: " + e.getMessage());
                            return map;
                        }

                        // 데이터베이스에서 이미지 엔티티 삭제
                        multiImgRepository.deleteById(imgId);
                    }

                }
            }

            // 파일이 업로드된 경우 처리
            if (files != null && files.length > 0) {
                for (MultipartFile mFile : files) {
                    // 고유한 파일명 생성
                    String originalFilename = mFile.getOriginalFilename();
                    String uniqueFilename = generateUniqueFilename(originalFilename); // 고유한 파일명 생성

                    // 새로운 MultiImgEntity 객체를 생성하여 파일 정보를 저장
                    MultiImgEntity img = new MultiImgEntity();
                    img.setImg(uniqueFilename); // 고유한 파일명 설정
                    img.setProEntity(existingpro);

                    // MultiImgEntity를 데이터베이스에 저장
                    MultiImgEntity mResult = multiImgRepository.save(img);

//                    try {
//                        // 파일을 지정된 경로에 저장
//                        mFile.transferTo(new File("c:/images/" + uniqueFilename));
//                    } catch (IllegalStateException | IOException e) {
//                        e.printStackTrace();
//                        // 파일 저장 중 오류 발생 시 에러 메시지를 맵에 추가
//                        map.put("code", 500);
//                        map.put("pro", "파일 업로드 중 오류 발생: " + e.getMessage());
//                        return map; // 에러 발생 시 바로 반환
                    try {
                        // S3에 파일 업로드
                        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                                .bucket(bucketName)
                                .key(uniqueFilename)
                                .contentType(mFile.getContentType())
                                .build();

                        RequestBody requestBody = RequestBody.fromInputStream(mFile.getInputStream(), mFile.getSize());
                        s3Client.putObject(putObjectRequest, requestBody);


                    } catch (S3Exception | IOException e) {
                        e.printStackTrace();
                        // 파일 저장 중 오류 발생 시 에러 메시지를 맵에 추가
                        map.put("code", 500);
                        map.put("pro", "파일 업로드 중 오류 발생: " + e.getMessage());
                        return map; // 에러 발생 시 바로 반환
                    }
                }
            } else {
                // 업로드된 파일이 없는 경우 기존 이미지 목록을 유지
                pro.setMultiImgEntitys(existingpro.getMultiImgEntitys());
            }

            int likeCount = existingpro.getLikeCount();
            // 수정된 ProEntity 객체를 데이터베이스에 저장
            pro.setLikeCount(likeCount);
            
            pro.setTime(existingpro.getTime());
            proRepository.save(pro);

            // 성공 응답을 맵에 추가
            map.put("code", 200);
            map.put("pro", "수정 완료");
            map.put("id", pro.getId()); 

        } else {
            // 기존 ProEntity가 없는 경우 처리
            map.put("code", 404);
            map.put("pro", "존재하지 않는 데이터입니다.");
        }

        return map; // 수정 완료 응답 반환
    }

//    @DeleteMapping("/project/delete")
//    public Map<String, Object> prodelete(@RequestParam Long Id,
//            @AuthenticationPrincipal CustomUserDetails userDetails) {
//
//        Map<String, Object> response = new HashMap<>();
//
//        // 프로젝트를 조회
//        Optional<ProEntity> projectOpt = proRepository.findById(Id);
//
//        if (projectOpt.isPresent()) {
//            ProEntity project = projectOpt.get();
//
//            // 로그인한 유저의 ID와 프로젝트 작성자의 ID를 비교
//            if (project.getUserEntity().getId().equals(userDetails.getUserEntity().getId())) {
//                // 유저가 일치할 경우 삭제
//                proRepository.deleteById(Id);
//                response.put("code", 200);
//                response.put("msg", "삭제 완료");
//            } else {
//                // 유저가 일치하지 않을 경우 권한 없음 처리
//                response.put("code", 403);
//                response.put("msg", "삭제 권한이 없습니다.");
//            }
//        } else {
//            // 해당 ID의 프로젝트가 없을 경우
//            response.put("code", 404);
//            response.put("msg", "프로젝트를 찾을 수 없습니다.");
//        }
//
//        return response;
//    }

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
                // 프로젝트에 연결된 모든 이미지 삭제
                List<MultiImgEntity> images = project.getMultiImgEntitys();
                for (MultiImgEntity img : images) {
                    try {
                        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                                .bucket(bucketName)
                                .key(img.getImg())
                                .build();
                        s3Client.deleteObject(deleteObjectRequest);
                    } catch (S3Exception e) {
                        e.printStackTrace();
                        // S3에서 이미지 삭제 실패 시 처리
                        response.put("code", 500);
                        response.put("msg", "S3에서 이미지 삭제 중 오류 발생: " + e.getMessage());
                        return response;
                    }
                }

                // 프로젝트 삭제
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

//        ProEntity pro = proOpt.get();
//        map.put("id", pro.getId());
//        map.put("title", pro.getTitle());
//        map.put("link", pro.getLink());
//        map.put("coment", pro.getComent());
//        map.put("name", pro.getName());
//        map.put("imgs", pro.getMultiImgEntitys().stream().map(mie -> MultiImgDto.fromEntity(mie)));
//        map.put("user", UserDTO.fromEntity(pro.getUserEntity()));
//        map.put("likeCount", pro.getLikeCount());
//        map.put("time", pro.getTime());
//
//        return map;
//
//    }

        if (proOpt.isPresent()) {
            ProEntity pro = proOpt.get();
            map.put("id", pro.getId());
            map.put("title", pro.getTitle());
            map.put("link", pro.getLink());
            map.put("coment", pro.getComent());
            map.put("name", pro.getName());
            map.put("imgs", pro.getMultiImgEntitys().stream().map(MultiImgDto::fromEntity).collect(Collectors.toList()));
            map.put("user", UserDTO.fromEntity(pro.getUserEntity()));
            map.put("likeCount", pro.getLikeCount());
            map.put("time", pro.getTime());

            // S3 파일 URL 추가
            List<String> imgUrls = pro.getMultiImgEntitys().stream()
                    .map(img -> getS3FileUrl(img.getImg()))
                    .collect(Collectors.toList());
            map.put("imgUrls", imgUrls);
        } else {
            map.put("code", 404);
            map.put("msg", "프로젝트를 찾을 수 없습니다.");
        }

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
                map.put("time", pro.getTime());
                map.put("imgs",  pro.getMultiImgEntitys().stream().map(mie -> MultiImgDto.fromEntity(mie)));
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
            Optional<MultiImgEntity> imgOptional = multiImgRepository.findById(id);

            // 파일이 존재하지 않으면 404 반환
            if (!imgOptional.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            MultiImgEntity img = imgOptional.get();
            String filename = img.getImg();

//            // 파일 경로 생성
//            Path filePath = fileStorageLocation.resolve(filename).normalize();
//            Resource resource = new UrlResource(filePath.toUri());
//
//            // 파일이 존재하지 않을 경우 404 반환
//            if (!resource.exists() || !resource.isReadable()) {
//                return ResponseEntity.notFound().build();
//            }
//
//            // 파일의 MIME 타입을 추측 (추가 설정 가능)
//            String contentType = "application/octet-stream";
//            return ResponseEntity.ok()
//                    .contentType(org.springframework.http.MediaType.parseMediaType(contentType))
//                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
//                    .body(resource);
//
//        } catch (IOException ex) {
//            // 파일 읽기 오류 처리
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }

// S3 적용
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
