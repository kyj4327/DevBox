package com.o2b2.devbox_server.user.service;


import com.o2b2.devbox_server.user.dto.JoinDTO;
import com.o2b2.devbox_server.user.entity.UserEntity;
import com.o2b2.devbox_server.user.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JoinService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public JoinService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {

        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public void joinProcess(JoinDTO joinDTO) {

        String email = joinDTO.getEmail();
        String password = joinDTO.getPassword();
        String name = joinDTO.getName();
        String nickname = joinDTO.getNickname();
        String field = joinDTO.getField();
        String role = joinDTO.getRole(); // 프론트엔드에서 넘어온 role 값

        Boolean isExist = userRepository.existsByEmail(email);

        if (isExist) {

            return;
        }

        UserEntity data = new UserEntity();

        data.setEmail(email);
        data.setPassword(bCryptPasswordEncoder.encode(password));
//        data.setRole("ROLE_USER");
        data.setName(name);
        data.setNickname(nickname);
        data.setField(field);
        data.setRole(role); // role을 저장

        userRepository.save(data);
    }
}
