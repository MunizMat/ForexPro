package com.MunizMat.ForexPro.services.impl;

import com.MunizMat.ForexPro.dtos.LoginDTO;
import com.MunizMat.ForexPro.dtos.LoginResponseDTO;
import com.MunizMat.ForexPro.entities.Trade;
import com.MunizMat.ForexPro.entities.User;
import com.MunizMat.ForexPro.repositories.TradeRepository;
import com.MunizMat.ForexPro.repositories.UserRepository;
import com.MunizMat.ForexPro.services.AuthServiceAsync;
import com.MunizMat.ForexPro.services.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class AuthServiceAsyncImpl implements AuthServiceAsync {
    private final UserRepository userRepository;
    private final TradeRepository tradeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthServiceAsyncImpl(
            UserRepository userRepository
            , PasswordEncoder passwordEncoder
            , JwtService jwtService,
            TradeRepository tradeRepository){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.tradeRepository = tradeRepository;
    }

    @Override
    public CompletableFuture<LoginResponseDTO> login(LoginDTO loginDTO) {
        return CompletableFuture.supplyAsync(() -> {
        User user = userRepository.findByEmail(loginDTO.email())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if(!passwordEncoder.matches(loginDTO.password(), user.getPassword()))
            throw new RuntimeException("Invalid credentials");

            List<Trade> trades = tradeRepository.findAllByUserId((long) user.getId());

            user.setTrades(trades);

        String token = this.jwtService.generateToken(String.valueOf(user.getId()));

        return new LoginResponseDTO(user, token);
        });
    }
}
