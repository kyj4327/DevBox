package com.o2b2.devbox_server.gatherMate.controller;

import com.o2b2.devbox_server.gatherMate.request.GatherMatePostCreate;
import com.o2b2.devbox_server.gatherMate.request.GatherMatePostEdit;
import com.o2b2.devbox_server.gatherMate.response.GatherMateResponse;
import com.o2b2.devbox_server.gatherMate.service.GatherMateService;
import com.o2b2.devbox_server.user.dto.CustomUserDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
        Long userId = (userDetails != null) ? userDetails.getUserEntity().getId() : null;

        return gatherMateService.get(postId, userId);
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
    @PutMapping("/edit/{postId}/recruiting")
    public ResponseEntity<Map<String, String>> updateRecruitmentStatus(@PathVariable Long postId,
                                                                       @RequestBody @Valid GatherMatePostEdit request,
                                                                       @AuthenticationPrincipal CustomUserDetails userDetails) {


        Long userId = userDetails.getUserEntity().getId();
        gatherMateService.updateRecruitmentStatus(postId, request, userId);

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
