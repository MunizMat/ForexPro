package com.MunizMat.ForexPro.controllers;

import com.MunizMat.ForexPro.config.AmqpAsyncConfig;
import com.MunizMat.ForexPro.dtos.CreateTradeDTO;
import com.MunizMat.ForexPro.records.GenericHTTPResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/trades")
public class TradeController {
    private final MessageChannel messageChannel;

    public TradeController(@Qualifier(AmqpAsyncConfig.CHANNEL_NAME) MessageChannel messageChannel){
        this.messageChannel = messageChannel;
    }

    @PostMapping
    public ResponseEntity<GenericHTTPResponse> registerTrade(@RequestBody CreateTradeDTO createTradeDTO) {
        try {
            String json = new ObjectMapper().writeValueAsString(createTradeDTO);
            messageChannel.send(new GenericMessage<>(json));

            return ResponseEntity.ok(new GenericHTTPResponse("Trade is being processed"));
        } catch (JsonProcessingException e) {
            return  ResponseEntity.status(500).body(new GenericHTTPResponse(e.getMessage()));
        }
    }
}
