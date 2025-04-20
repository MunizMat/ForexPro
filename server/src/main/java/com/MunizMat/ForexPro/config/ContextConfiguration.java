package com.MunizMat.ForexPro.config;

import com.MunizMat.ForexPro.dtos.CreateTradeDTO;
import com.MunizMat.ForexPro.messages.server.TradeCompletedMessage;
import com.MunizMat.ForexPro.services.TradeService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.channel.QueueChannel;
import org.springframework.integration.config.EnableIntegration;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.util.concurrent.CompletableFuture;

@Configuration
@EnableIntegration
@EnableRabbit
public class ContextConfiguration {
    private static final Logger logger = LoggerFactory.getLogger(ContextConfiguration.class);
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final TradeService tradeService;

    public ContextConfiguration(TradeService tradeService) {
        this.tradeService = tradeService;
    }

    @Bean
    QueueChannel fromRabbitViaPublisher() {
        return new QueueChannel();
    }

    @RabbitListener(queuesToDeclare = @Queue("trades"))
    @Payload("#args.payload.toUpperCase()")
    public CompletableFuture consumeForPublisher(String payload) {
        try {
            CreateTradeDTO createTradeDTO = objectMapper.readValue(payload, CreateTradeDTO.class);

            return tradeService.registerTrade(createTradeDTO)
                    .thenApply(trade -> {
                        WebSocketSession session = ServerWebSocketHandler.connectedClients.get(createTradeDTO.sessionId());

                        if(session == null)
                            throw new RuntimeException("Session not found");

                        try {
                            String json = objectMapper.writeValueAsString(new TradeCompletedMessage(trade));

                            session.sendMessage(new TextMessage(json));
                        } catch (Exception e) {
                            throw new RuntimeException(e);
                        }

                        return null;
                    })
                    .exceptionally(ex -> {
                        logger.error("Failed to process trade: {}", ex.getMessage());
                        return null;
                    });
        } catch (JsonProcessingException e) {
            logger.error("Failed to parse JSON message: {}", e.getMessage());
        } catch (Exception e) {
            logger.error("Failed to process message: {}", e.getMessage());
        }

        return null;
    }

}