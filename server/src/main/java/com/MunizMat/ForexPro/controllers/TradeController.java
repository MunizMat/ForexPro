package com.MunizMat.ForexPro.controllers;

import com.MunizMat.ForexPro.dtos.CreateTradeDTO;
import com.MunizMat.ForexPro.entities.Trade;
import com.MunizMat.ForexPro.services.TradeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/trades")
public class TradeController {
    private final TradeService tradeService;

    public TradeController(TradeService tradeService){
        this.tradeService = tradeService;
    }

    @PostMapping
    public CompletableFuture<ResponseEntity<Trade>> registerTrade(@RequestBody CreateTradeDTO createTradeDTO) {
        return tradeService.registerTrade(createTradeDTO).thenApply(ResponseEntity::ok)
                .exceptionally((ex) -> ResponseEntity.status(500).body(null));

    }
}
