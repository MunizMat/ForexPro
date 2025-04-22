package com.MunizMat.ForexPro.dtos;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Data
public class CreateTradeDTO {
        private String tradeType;
        private double amount;
        private String baseCurrency;
        private String quoteCurrency;
        private double exchangeRate;
        private String currencyPair;
        private Long userId;
        private String sessionId;
}
