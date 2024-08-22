package com.o2b2.devbox_server.reference.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @GetMapping("/reference/list")
    public List<Reference> referenceList() {
        List<Reference> list = referenceRepository.findAll();
        return list;
    }

}
