package com.o2b2.devbox_server.reference.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.o2b2.devbox_server.reference.model.Reference;
import com.o2b2.devbox_server.reference.repository.ReferenceRepository;

@RestController
@CrossOrigin
public class ReferenceController {
    @Autowired
    ReferenceRepository referenceRepository;

    @PostMapping("/reference/write")
    public Map<String, Object> referenceWrite(@RequestBody Reference reference) {
        Reference result = referenceRepository.save(reference);
        Map<String, Object> map = new HashMap<>();
        map.put("code", 200);
        map.put("msg", "입력 완료");
        map.put("result", result);
        return map;
    }

    @GetMapping("/reference/list/{selectJob}")
    public List<Map<String, Object>> referenceList(
            @PathVariable("selectJob") String selectJob,
            @RequestParam(value = "page", defaultValue = "1") int page) {
        Sort sort = Sort.by(Order.desc("id"));
        Pageable pageable = PageRequest.of(page - 1, 10, sort);
        Page<Reference> p = null;
        if (selectJob.equals("All")) {
            p = referenceRepository.findAll(pageable);
        } else {
            p = referenceRepository.findBySelectJob(selectJob, pageable);
        }
        List<Reference> list = p.getContent();
        List<Map<String, Object>> response = new ArrayList<>();
        for (Reference r : list) {
            Map<String, Object> rMap = new HashMap<>();
            rMap.put("id", r.getId());
            rMap.put("title", r.getTitle());
            rMap.put("selectJob", r.getSelectJob());
            rMap.put("content1", r.getContent1());
            rMap.put("content2", r.getContent2());
            rMap.put("link", r.getLink());
            response.add(rMap);
        }
        int totalPage = p.getTotalPages();
        int startPage = (page - 1) / 10 * 10 + 1;
        int endPage = startPage + 9;
        if (endPage > totalPage) {
            endPage = totalPage;
        }
        Map<String, Object> pMap = new HashMap<>();
        pMap.put("totalPage", totalPage);
        pMap.put("startPage", startPage);
        pMap.put("endPage", endPage);
        pMap.put("currentPage", page);
        response.add(pMap);

        return response;
    }

    @GetMapping("/reference/delete")
    public String referenceDelete(@RequestParam Long referenceId) {
        referenceRepository.deleteById(referenceId);
        return "삭제 완료";
    }

    @GetMapping("/reference/update")
    public Map<String, Object> referenceUpdate(@RequestParam Long referenceId) {
        Optional<Reference> opt = referenceRepository.findById(referenceId);
        Reference reference = opt.get();
        Map<String, Object> map = new HashMap<>();
        map.put("id", reference.getId());
        map.put("title", reference.getTitle());
        map.put("selectJob", reference.getSelectJob());
        map.put("content1", reference.getContent1());
        map.put("content2", reference.getContent2());
        map.put("link", reference.getLink());
        return map;
    }

    @PostMapping("/reference/update")
    public Map<String, Object> referenceUpdate(@RequestBody Reference reference) {
        Reference result = referenceRepository.save(reference);
        Map<String, Object> map = new HashMap<>();
        map.put("code", 200);
        map.put("msg", "입력 완료");
        map.put("result", result);
        return map;
    }

}