package com.o2b2.devbox_server.reference.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Reference> referenceList(@PathVariable("selectJob") String selectJob) {
        if (selectJob.equals("All")) {
            List<Reference> list = referenceRepository.findAll();
            return list;
        } else {
            List<Reference> list = referenceRepository.findBySelectJob(selectJob);
            return list;
        }
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
