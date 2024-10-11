package com.o2b2.devbox_server.eduInfo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import lombok.Data;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Entity
@Data
public class EduEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String title;

    // 진행 회사 로고 이미지
    String logo;

    String subtitle;

    String img;

    String recruit;

    String eduterm;

    String people;

    String link;

    String state;

    @Transient
    private LocalDate endDate;

    public LocalDate getEndDate() {
        if (endDate == null) {
            String[] dates = recruit.split(" ~ ");
            if (dates.length < 2) {
                throw new IllegalArgumentException("Invalid recruit format");
            }
            endDate = LocalDate.parse(dates[1], DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        }
        return endDate;
    }

    // 남은 일수를 계산하는 메서드
    public int getRemainingDays() {
        LocalDate now = LocalDate.now();
        return (int) java.time.temporal.ChronoUnit.DAYS.between(now, getEndDate());
    }

}
