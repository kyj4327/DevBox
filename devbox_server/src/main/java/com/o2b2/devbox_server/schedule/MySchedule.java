package com.o2b2.devbox_server.schedule;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.o2b2.devbox_server.eduInfo.model.EduEntity;
import com.o2b2.devbox_server.eduInfo.repository.EduRepository;

@Component
public class MySchedule {
    @Autowired
    EduRepository eduRepository;

    @Scheduled(cron = "0 0 0 * * *")
    public void run() {
        List<EduEntity> eduList = eduRepository.findByState("모집중");

        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (EduEntity edu : eduList) {
            String[] dates = edu.getRecruit().split(" ~ ");  // "2024-09-01 ~ 2024-09-07"에서 날짜 분리
            LocalDate endDate = LocalDate.parse(dates[1], formatter);  // 종료일 추출 및 변환

            if (endDate.isBefore(today) || endDate.isEqual(today)) {
                edu.setState("모집완료");  // 상태 업데이트
                eduRepository.save(edu);  // 변경사항 저장
            }
        }

        System.out.println("테스트 출력");
    }

}
