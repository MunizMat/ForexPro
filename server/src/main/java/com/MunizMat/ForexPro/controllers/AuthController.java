package com.MunizMat.ForexPro.controllers;

import com.MunizMat.ForexPro.dtos.CreateUserDTO;
import com.MunizMat.ForexPro.dtos.LoginDTO;
import com.MunizMat.ForexPro.dtos.LoginResponseDTO;
import com.MunizMat.ForexPro.entities.User;
import com.MunizMat.ForexPro.services.AuthServiceAsync;
import com.MunizMat.ForexPro.services.UserServiceAsync;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthServiceAsync authServiceAsync;
    private final UserServiceAsync userServiceAsync;

    public AuthController(AuthServiceAsync authServiceAsync, UserServiceAsync userServiceAsync){
        this.authServiceAsync = authServiceAsync;
        this.userServiceAsync = userServiceAsync;
    }


    @GetMapping(path = "/demo")
    public CompletableFuture<ResponseEntity<LoginResponseDTO>> demoLogin() {
        return authServiceAsync.loginDemoAccount()
                .thenApply((result -> ResponseEntity.status(200).body(result)))
                .exceptionally(ex -> {
                    System.err.println(ex.getMessage());
                    return ResponseEntity.status(500).body(null);
                });
    }

    @GetMapping
    public CompletableFuture<ResponseEntity<LoginResponseDTO>> login(@RequestParam String email, @RequestParam String password) {
                LoginDTO loginDTO = new LoginDTO(email, password);

                return authServiceAsync.login(loginDTO)
                .thenApply((result -> ResponseEntity.status(200).body(result)))
                .exceptionally(ex -> {
                    System.err.println(ex.getMessage());
                    return ResponseEntity.status(500).body(null);
                });
    }

    @PostMapping
    public CompletableFuture<ResponseEntity<User>> signUp(@RequestBody CreateUserDTO createUserDTO) {
        return userServiceAsync.createUser(createUserDTO)
                .thenApply((user -> ResponseEntity.status(201).body(user)))
                .exceptionally(ex -> {
                    System.err.println(ex.getMessage());
                    return ResponseEntity.status(500).body(null);
                });
    }
}
