package com.o2b2.devbox_server.greeting.controller;

import com.o2b2.devbox_server.greeting.request.GreetingPostCreate;
import com.o2b2.devbox_server.greeting.request.GreetingPostEdit;
import com.o2b2.devbox_server.greeting.response.GreetingResponse;
import com.o2b2.devbox_server.greeting.service.GreetingService;
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
@RequestMapping("/greeting")
public class GreetingController {

    private final GreetingService greetingService;

    // 작성
    @PostMapping("/write")
    public ResponseEntity<Map<String, Object>> post(
            @RequestBody @Valid GreetingPostCreate request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getUserEntity().getId();
        request.setUserId(userId);

        Long postId = greetingService.write(request);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "글이 성공적으로 저장되었습니다.");
        response.put("id", postId);

        return ResponseEntity.ok(response);
    }

    // 게시글 상세
    @GetMapping("/posts/{postId}")
    public GreetingResponse get(@PathVariable Long postId,
                                  @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = (userDetails != null) ? userDetails.getUserEntity().getId() : null;

        return greetingService.get(postId, userId);
    }

    // 게시글 리스트
    @GetMapping("/posts")
    public ResponseEntity<Map<String, Object>> getList(
            @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<GreetingResponse> page = greetingService.getList(pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("content", page.getContent());
        response.put("totalPages", page.getTotalPages());

        return ResponseEntity.ok(response);
    }

    //검색
    @GetMapping("/posts/search")
    public ResponseEntity<Map<String, Object>> search(@RequestParam String keyword,
                                                      @RequestParam String searchType,
                                                      @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<GreetingResponse> page = greetingService.search(keyword, searchType, pageable);
        Map<String, Object> response = new HashMap<>();
        response.put("content", page.getContent());
        response.put("totalPages", page.getTotalPages());

        return ResponseEntity.ok(response);
    }

    // 수정하기
    @PutMapping("/edit/{postId}")
    public ResponseEntity<Map<String, String>> edit(@PathVariable Long postId,
                                                    @RequestBody @Valid GreetingPostEdit request,
                                                    @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getUserEntity().getId();
        greetingService.edit(postId, request, userId);

        Map<String, String> response = new HashMap<>();
        response.put("message", "글이 성공적으로 수정되었습니다.");

        return ResponseEntity.ok(response);
    }

    // 삭제하기
    @DeleteMapping("/delete/{postId}")
    public void delete(@PathVariable Long postId, @AuthenticationPrincipal CustomUserDetails userDetails) {

        Long userId = userDetails.getUserEntity().getId();

        greetingService.delete(postId,userId);
    }

}
