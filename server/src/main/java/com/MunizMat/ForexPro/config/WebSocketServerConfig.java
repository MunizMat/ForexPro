package com.MunizMat.ForexPro.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketServerConfig implements WebSocketConfigurer {
    private final ServerWebSocketHandler serverWebSocketHandler;

    public WebSocketServerConfig(ServerWebSocketHandler serverWebSocketHandler) {
        this.serverWebSocketHandler = serverWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(serverWebSocketHandler, "/rates")
                .setAllowedOrigins("*");

    }
}