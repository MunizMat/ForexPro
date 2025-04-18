package com.MunizMat.ForexPro.services;

import com.MunizMat.ForexPro.dtos.CreateTradeDTO;
import com.MunizMat.ForexPro.dtos.RegisterTradeResponseDTO;

import java.util.concurrent.CompletableFuture;

public interface TradeService {
    CompletableFuture<RegisterTradeResponseDTO> registerTrade(CreateTradeDTO createTradeDTO);
}
