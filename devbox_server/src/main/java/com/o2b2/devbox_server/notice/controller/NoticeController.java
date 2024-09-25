package com.o2b2.devbox_server.notice.controller;

import com.o2b2.devbox_server.notice.request.NoticePostCreate;
import com.o2b2.devbox_server.notice.request.NoticePostEdit;
import com.o2b2.devbox_server.notice.response.NoticeResponse;
import com.o2b2.devbox_server.notice.service.NoticeService;
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
@RequestMapping("/notice")
public class NoticeController {

    private final NoticeService noticeService;

    @PostMapping("/write")
    public ResponseEntity<Map<String, Object>> post(
            @RequestBody @Valid NoticePostCreate request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getUserEntity().getId();
        request.setUserId(userId);

        Long postId = noticeService.write(request);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "공지사항이 등록되었습니다.");
        response.put("id", postId);

        return ResponseEntity.ok(response);
    }

    // 게시글 상세
    @GetMapping("/posts/{postId}")
    public NoticeResponse get(@PathVariable Long postId,
                                  @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = (userDetails != null) ? userDetails.getUserEntity().getId() : null;

        return noticeService.get(postId, userId);
    }

    // 게시글 리스트
    @GetMapping("/posts")
    public ResponseEntity<Map<String, Object>> getList(
            @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<NoticeResponse> page = noticeService.getList(pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("totalPages", page.getTotalPages());
        response.put("totalElements", page.getTotalElements());
        response.put("currentPage", page.getNumber());
        response.put("pageSize", page.getSize());
        response.put("posts", page.getContent());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/posts/search")
    public ResponseEntity<Map<String, Object>> search(@RequestParam String keyword,
                                                      @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<NoticeResponse> page = noticeService.search(keyword, pageable);
        Map<String, Object> response = new HashMap<>();
        response.put("content", page.getContent());
        response.put("totalPages", page.getTotalPages());

        return ResponseEntity.ok(response);
    }

    // 수정하기
    @PutMapping("/edit/{postId}")
    public ResponseEntity<Map<String, String>> edit(@PathVariable Long postId,
                                                    @RequestBody @Valid NoticePostEdit request,
                                                    @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getUserEntity().getId();
        noticeService.edit(postId, request, userId);

        Map<String, String> response = new HashMap<>();
        response.put("message", "공지사항이 수정되었습니다.");

        return ResponseEntity.ok(response);
    }

    // 삭제하기
    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable Long postId, @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getUserEntity().getId();

        noticeService.delete(postId,userId);

        Map<String, String> response = new HashMap<>();
        response.put("message", "공지사항이 삭제되었습니다.");

        return ResponseEntity.ok(response);
    }

}
