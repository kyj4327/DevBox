package com.o2b2.devbox_server;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DevboxServerApplication {

	public static void main(String[] args) {
// .env 파일 로드
		Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

		// 시스템 속성에 환경 변수 설정
		System.setProperty("MYSQL_USERNAME", dotenv.get("MYSQL_USERNAME"));
		System.setProperty("MYSQL_PASSWORD", dotenv.get("MYSQL_PASSWORD"));

		SpringApplication.run(DevboxServerApplication.class, args);
	}

}
