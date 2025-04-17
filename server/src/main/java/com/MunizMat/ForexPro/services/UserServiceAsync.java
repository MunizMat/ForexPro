package com.MunizMat.ForexPro.services;

import com.MunizMat.ForexPro.dtos.CreateUserDTO;
import com.MunizMat.ForexPro.entities.User;

import java.util.concurrent.CompletableFuture;

public interface UserServiceAsync {
    CompletableFuture<User> createUser(CreateUserDTO createUserDTO);
}