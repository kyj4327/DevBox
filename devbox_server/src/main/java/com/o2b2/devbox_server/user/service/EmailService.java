package com.o2b2.devbox_server.user.service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendVerificationCode(String to, String code) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject("[DevBox] 비밀번호 찾기 인증코드");

            String emailContent = String.format(
                    "<h4>아래의 인증코드를 입력해주세요.</h4><br>"
                            + "<h1>인증코드 : <span style='color:blue;'>%s</span></h1>",
                    code);

            helper.setText(emailContent, true);
            mailSender.send(message);
        } catch (MessagingException e) {
        }
    }
}