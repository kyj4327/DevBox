package com.o2b2.devbox_server.schedule;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class MySchedule {

    @Scheduled(cron = "0/5 0 * * * ?")
    public void run() {
        System.out.println("테스트 출력");
    }

}
