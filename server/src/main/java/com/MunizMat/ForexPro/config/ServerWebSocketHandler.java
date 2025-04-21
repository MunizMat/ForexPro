package com.MunizMat.ForexPro.config;

import com.MunizMat.ForexPro.messages.server.SessionIDMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHttpHeaders;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

@Component
public class ServerWebSocketHandler extends TextWebSocketHandler {
    public static final Map<String, WebSocketSession> connectedClients = new HashMap();
    private static final Logger logger = LoggerFactory.getLogger(ServerWebSocketHandler.class);
    private final AtomicReference<WebSocketSession> sessionRef = new AtomicReference<>();
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final WebSocketClient webSocketClient;
    private final ForexAPIWebSocketHandler forexAPIWebSocketHandler;

    public ServerWebSocketHandler(WebSocketClient webSocketClient, ForexAPIWebSocketHandler forexAPIWebSocketHandler) {
        this.webSocketClient = webSocketClient;
        this.forexAPIWebSocketHandler = forexAPIWebSocketHandler;
    }

    private void connectToForexService(){
        String token = System.getenv("FOREX_API_TOKEN");

        if(token == null || token.isBlank())
            throw new RuntimeException("FOREX_API_TOKEN environment variable not set");

      try {
          URI uri = new URI("wss://quote.alltick.io/quote-b-ws-api?token=%s".formatted(token));
          WebSocketHttpHeaders headers = new WebSocketHttpHeaders();

          webSocketClient.execute(forexAPIWebSocketHandler, headers, uri)
                  .thenRun(() -> logger.info("Connected to Forex Service"))
                  .exceptionally(ex -> {
                      logger.error("Failed to connect to Forex service: ", ex);
                      return null;
                  });
      } catch (Exception e) {
          logger.error("Failed to connect to Forex Service: ", e);
          throw new RuntimeException(e);
      }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        if(connectedClients.isEmpty())
            connectToForexService();

        connectedClients.put(session.getId(), session);
        sessionRef.set(session);

        session.sendMessage(new TextMessage(objectMapper.writeValueAsString(new SessionIDMessage(new SessionIDMessage.Payload(session.getId())))));
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        logger.info("Received message: {}", payload);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessionRef.compareAndSet(session, null);
        connectedClients.remove(session.getId());

        if(connectedClients.isEmpty())
            forexAPIWebSocketHandler.disconnect();
    }
}