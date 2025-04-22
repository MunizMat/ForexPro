package com.MunizMat.ForexPro.services;

import com.MunizMat.ForexPro.dtos.LoginDTO;
import com.MunizMat.ForexPro.dtos.LoginResponseDTO;

import java.util.concurrent.CompletableFuture;

public interface AuthServiceAsync {
    CompletableFuture<LoginResponseDTO> login(LoginDTO loginDTO);
    CompletableFuture<LoginResponseDTO> loginDemoAccount();
}
