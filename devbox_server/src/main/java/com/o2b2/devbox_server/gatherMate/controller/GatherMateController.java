package com.o2b2.devbox_server.gatherMate.controller;

import com.o2b2.devbox_server.gatherMate.request.GatherMatePostCreate;
import com.o2b2.devbox_server.gatherMate.request.GatherMatePostEdit;
import com.o2b2.devbox_server.gatherMate.response.GatherMateResponse;
import com.o2b2.devbox_server.gatherMate.service.GatherMateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/gathermate")
public class GatherMateController {

    private final GatherMateService gatherMateService;

    @PostMapping("/posts")
    public ResponseEntity<Map<String, Object>> post(@RequestBody @Valid GatherMatePostCreate request) {
        Long postId = gatherMateService.write(request);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "글이 성공적으로 저장되었습니다.");
        response.put("id", postId);

        return ResponseEntity.ok(response);
    }

    // 게시글 상세
    @GetMapping("/posts/{postId}")
    public GatherMateResponse get(@PathVariable Long postId) {
        return gatherMateService.get(postId);
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
                                                      @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<GatherMateResponse> page = gatherMateService.search(keyword, pageable);
        Map<String, Object> response = new HashMap<>();
        response.put("content", page.getContent());
        response.put("totalPages", page.getTotalPages());

        return ResponseEntity.ok(response);
    }

    // 수정하기
    @PutMapping("/posts/{postId}")
    public void edit(@PathVariable Long postId, @RequestBody @Valid GatherMatePostEdit request) {
        gatherMateService.edit(postId, request);
    }

    // 모집중 모집완료
    @PutMapping("/posts/{postId}/recruiting")
    public void updateRecruitmentStatus(@PathVariable Long postId, @RequestBody @Valid GatherMatePostEdit request) {
        gatherMateService.updateRecruitmentStatus(postId, request);
    }

    // 삭제하기
    @DeleteMapping("/posts/{postId}")
    public void delete(@PathVariable Long postId) {
        gatherMateService.delete(postId);
    }
}
