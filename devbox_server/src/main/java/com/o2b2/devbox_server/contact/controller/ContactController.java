package com.o2b2.devbox_server.contact.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.o2b2.devbox_server.contact.Dto.ContactRequest;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/send")
    public ResponseEntity<?> sendContact(@RequestBody ContactRequest emailRequest) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            String systemEmail = "devbox2024@gmail.com";
            helper.setFrom(systemEmail); // 발신자는 시스템 이메일로 설정
            helper.setTo(new String[] { systemEmail, emailRequest.getEmail() }); // 수신자는 시스템 이메일로 설정

            helper.setReplyTo(emailRequest.getEmail()); // 회신 이메일을 문의자의 이메일로 설정
            helper.setSubject("[DevBox] 문의사항 : " + emailRequest.getSubject());

            String emailContent = String.format(
                    "<h1>\"%s\" 님의 문의사항입니다.</h1><br>"
                            + "<h4>이름 : %s</h4><br>"
                            + "<h4>이메일 : %s</h4><br>"
                            + "<h4>전화번호 : %s</h4><br>"
                            + "<hr><br>"
                            + "<h4>제목</h4><br>"
                            + "<p>%s</p><br>"
                            + "<h4>내용</h4><br>"
                            + "<p>%s</p>",
                    emailRequest.getName(),
                    emailRequest.getName(),
                    emailRequest.getEmail(),
                    emailRequest.getPhone(),
                    emailRequest.getSubject(),
                    emailRequest.getMessage());

            helper.setText(emailContent, true);

            mailSender.send(message);

            return ResponseEntity.ok().body("문의가 성공적으로 전송되었습니다");
        } catch (MessagingException e) {
            return ResponseEntity.internalServerError().body("문의 전송 실패: " + e.getMessage());
        }
    }
}
