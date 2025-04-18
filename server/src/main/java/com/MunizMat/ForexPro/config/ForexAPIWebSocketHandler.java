package com.MunizMat.ForexPro.config;

import com.MunizMat.ForexPro.enums.ForexAPIWebSocketEventType;
import com.MunizMat.ForexPro.messages.forexapi.ForexAPIWebSocketMessage;
import com.MunizMat.ForexPro.messages.forexapi.GetCurrencyRateMessage;
import com.MunizMat.ForexPro.messages.forexapi.GetCurrencyRateResponseMessage;
import com.MunizMat.ForexPro.messages.server.SendRatesMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Objects;
import java.util.concurrent.atomic.AtomicReference;

public class ForexAPIWebSocketHandler extends TextWebSocketHandler {
    private static final Logger logger = LoggerFactory.getLogger(ForexAPIWebSocketHandler.class);
    private final AtomicReference<WebSocketSession> sessionRef = new AtomicReference<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private void getExchangeRates(WebSocketSession session){
        try {
            String message = objectMapper.writeValueAsString(new GetCurrencyRateMessage());
            session.sendMessage(new TextMessage(message));

        } catch (Exception e) {
            logger.error("Failed to get exchange rates from Forex rates API: {}", e.getMessage());
        }
    }

    private void sendExchangeRatesToConnectedClient(ForexAPIWebSocketMessage message, WebSocketSession client){
        try {
            SendRatesMessage clientMessage = getSendRatesMessage((GetCurrencyRateResponseMessage) message);
            String json = objectMapper.writeValueAsString(clientMessage);
            client.sendMessage(new TextMessage(json));
        } catch (Exception e) {
            logger.error("Failed to send exchange rates to connected client: ", e);
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        logger.info("Connected to Forex rates API: {}", session.getId());

        sessionRef.set(session);
        getExchangeRates(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        try {
            String payload = message.getPayload();

            ForexAPIWebSocketMessage wsMessage = objectMapper.readerFor(ForexAPIWebSocketMessage.class).readValue(payload);

            if (Objects.requireNonNull(wsMessage.getEvent()) == ForexAPIWebSocketEventType.GET_RATES_RESPONSE) {
                ServerWebSocketHandler.connectedClients.forEach((client) -> {
                    sendExchangeRatesToConnectedClient(wsMessage, client);
                });
            }
        } catch (Exception e) {
            logger.error("Failed to handle message from Forex rates API: ", e);
        }
    }

    private static SendRatesMessage getSendRatesMessage(GetCurrencyRateResponseMessage responseMessage) {
        GetCurrencyRateResponseMessage.Data.Price[] asks = responseMessage.getData().getAsks();
        GetCurrencyRateResponseMessage.Data.Price[] bids = responseMessage.getData().getBids();

        GetCurrencyRateResponseMessage.Data.Price bid = bids[0];
        GetCurrencyRateResponseMessage.Data.Price ask = asks[0];

        return new SendRatesMessage(
                new SendRatesMessage.Payload(
                        Double.parseDouble(bid.getPrice()),
                        Double.parseDouble(ask.getPrice()),
                        Long.parseLong(responseMessage.getData().getTick_time()),
                        responseMessage.getData().getCode()
                )
        );
    }
}