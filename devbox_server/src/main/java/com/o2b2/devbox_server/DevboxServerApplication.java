package com.o2b2.devbox_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DevboxServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(DevboxServerApplication.class, args);
	}

}
