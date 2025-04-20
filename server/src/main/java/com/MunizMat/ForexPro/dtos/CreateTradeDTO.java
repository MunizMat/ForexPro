package com.MunizMat.ForexPro.dtos;

public record CreateTradeDTO(
        String tradeType,
        double amount,
        String baseCurrency,
        String quoteCurrency,
        double exchangeRate,
        String currencyPair,
        Long userId,
        String sessionId
        ) {
}
