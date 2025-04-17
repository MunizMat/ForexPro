package com.MunizMat.ForexPro.services.impl;

import com.MunizMat.ForexPro.dtos.CreateUserDTO;
import com.MunizMat.ForexPro.entities.User;
import com.MunizMat.ForexPro.services.AuthServiceAsync;
import com.MunizMat.ForexPro.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class AuthServiceAsyncImpl implements AuthServiceAsync {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceAsyncImpl(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public CompletableFuture<User> createUser(CreateUserDTO createUserDTO) {
        return CompletableFuture.supplyAsync(() -> {
            User user = new User();
            String hashedPassword = passwordEncoder.encode(createUserDTO.password());

            user.setEmail(createUserDTO.email());
            user.setName(createUserDTO.name());
            user.setPassword(hashedPassword);

            return userRepository.save(user);
        });
    }
}
