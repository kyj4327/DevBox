package com.o2b2.devbox_server.gatherMate.controller;

import com.o2b2.devbox_server.gatherMate.request.GatherMatePostCreate;
import com.o2b2.devbox_server.gatherMate.request.GatherMatePostEdit;
import com.o2b2.devbox_server.gatherMate.request.GatherMateRecruitingUpdate;
import com.o2b2.devbox_server.gatherMate.response.GatherMateResponse;
import com.o2b2.devbox_server.gatherMate.service.GatherMateService;
import com.o2b2.devbox_server.user.dto.CustomUserDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/gathermate")
public class GatherMateController {

    private final GatherMateService gatherMateService;

    @PostMapping("/write")
    public ResponseEntity<Map<String, Object>> post(
            @RequestBody @Valid GatherMatePostCreate request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getUserEntity().getId();
        request.setUserId(userId);

        Long postId = gatherMateService.write(request);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "글이 성공적으로 저장되었습니다.");
        response.put("id", postId);

        return ResponseEntity.ok(response);
    }

    // 게시글 상세
    @GetMapping("/posts/{postId}")
    public GatherMateResponse get(@PathVariable Long postId,
                                  @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = null;
        if (userDetails != null) {
            userId = userDetails.getUserEntity().getId();
        }

        return gatherMateService.get(postId, userId);
    }

    // isLiked 조회
    @GetMapping("/isLiked/posts/{postId}")
    public ResponseEntity<Map<String, Boolean>> isPostLiked(@PathVariable Long postId,
                                                            @AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("isLiked", false));
        }

        Long userId = userDetails.getUserEntity().getId();
        boolean isLiked = gatherMateService.isPostLikedByUser(postId, userId);

        return ResponseEntity.ok(Map.of("isLiked", isLiked));
    }

    // 게시글 리스트
    @GetMapping("/posts")
    public ResponseEntity<Map<String, Object>> getList(
            @RequestParam(required = false) String category,
            @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<GatherMateResponse> page;

        // 카테고리 -> intro로 필터링
        if (category != null && !category.equals("All")) {
            page = gatherMateService.getListByCategory(category, pageable);
        } else {
            // 카테고리가 없거나 'All'이면 전체 목록 가져오기
            page = gatherMateService.getList(pageable);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("content", page.getContent());
        response.put("totalPages", page.getTotalPages());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/posts/search")
    public ResponseEntity<Map<String, Object>> search(@RequestParam String keyword,
                                                      @RequestParam String searchType,
                                                      @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<GatherMateResponse> page = gatherMateService.search(keyword, searchType, pageable);
        Map<String, Object> response = new HashMap<>();
        response.put("content", page.getContent());
        response.put("totalPages", page.getTotalPages());

        return ResponseEntity.ok(response);
    }

    // 로그인한 회원작성글
    @GetMapping("/myposts")
    public ResponseEntity<Map<String, Object>> getMyPosts(
            @RequestParam(required = false) String category,
            @PageableDefault(size = 5, sort = "id", direction = Sort.Direction.DESC) Pageable pageable,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getUserEntity().getId();
        Map<String, Object> response = gatherMateService.getMyPosts(userId,category, pageable);

        return ResponseEntity.ok(response);
    }

    // 로그인한 회원작성글 검색
    @GetMapping("/myposts/search")
    public ResponseEntity<Map<String, Object>> searchMyPosts(
            @RequestParam String keyword,
            @RequestParam String searchType,
            @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getUserEntity().getId();
        Map<String, Object> response = gatherMateService.searchMyPosts(userId, keyword, searchType, pageable);

        return ResponseEntity.ok(response);
    }

    // 수정하기
    @PutMapping("/edit/{postId}")
    public ResponseEntity<Map<String, String>> edit(@PathVariable Long postId,
                                                    @RequestBody @Valid GatherMatePostEdit request,
                                                    @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getUserEntity().getId();
        gatherMateService.edit(postId, request, userId);

        Map<String, String> response = new HashMap<>();
        response.put("message", "글이 성공적으로 수정되었습니다.");

        return ResponseEntity.ok(response);
    }

    // 모집중 모집완료
//    @PutMapping("/edit/{postId}/recruiting")
//    public ResponseEntity<Map<String, String>> updateRecruitmentStatus(@PathVariable Long postId,
//                                                                       @RequestBody @Valid GatherMateRecruitingUpdate request,
//                                                                       @AuthenticationPrincipal CustomUserDetails userDetails) {
//
//        Long userId = userDetails.getUserEntity().getId();
//        gatherMateService.updateRecruitmentStatus(postId, request, userId);
//
//        Map<String, String> response = new HashMap<>();
//        response.put("message", "모집 상태가 성공적으로 변경되었습니다.");
//
//        return ResponseEntity.ok(response);
//    }
    @PutMapping("/edit/{postId}/recruiting")
    public ResponseEntity<Map<String, String>> updateRecruitmentStatus(@PathVariable Long postId,
                                                                       @RequestBody Map<String, Boolean> request,
                                                                       @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getUserEntity().getId();

        // 요청 바디에서 isRecruiting 값 추출
        Boolean isRecruiting = request.get("isRecruiting");
        if (isRecruiting == null) {
            throw new IllegalArgumentException("isRecruiting 값이 필요합니다.");
        }

        // 서비스 메서드 호출
        gatherMateService.updateRecruitmentStatus(postId, isRecruiting, userId);

        Map<String, String> response = new HashMap<>();
        response.put("message", "모집 상태가 성공적으로 변경되었습니다.");

        return ResponseEntity.ok(response);
    }

    // 삭제하기
    @DeleteMapping("/delete/{postId}")
    public void delete(@PathVariable Long postId, @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getUserEntity().getId();

        gatherMateService.delete(postId,userId);
    }

}
