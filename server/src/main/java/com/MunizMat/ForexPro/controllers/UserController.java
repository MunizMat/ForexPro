package com.MunizMat.ForexPro.controllers;

import com.MunizMat.ForexPro.dtos.CreateUserDTO;
import com.MunizMat.ForexPro.entities.User;
import com.MunizMat.ForexPro.services.UserServiceAsync;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserServiceAsync userServiceAsync;

    public UserController(UserServiceAsync userServiceAsync){
        this.userServiceAsync = userServiceAsync;
    }

    @PostMapping
    public CompletableFuture<ResponseEntity<User>> createUser(@RequestBody CreateUserDTO createUserDTO) {
                return userServiceAsync.createUser(createUserDTO)
                .thenApply((user -> ResponseEntity.status(201).body(user)))
                .exceptionally(ex -> {
                    System.err.println(ex.getMessage());
                    return ResponseEntity.status(500).body(null);
                });
    }
}
