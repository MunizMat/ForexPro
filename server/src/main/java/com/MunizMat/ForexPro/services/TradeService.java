package com.MunizMat.ForexPro.services;

import com.MunizMat.ForexPro.dtos.CreateTradeDTO;
import com.MunizMat.ForexPro.entities.Trade;

import java.util.concurrent.CompletableFuture;

public interface TradeService {
    CompletableFuture<Trade> registerTrade(CreateTradeDTO createTradeDTO);
}
