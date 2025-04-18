package com.MunizMat.ForexPro.utils;

import com.MunizMat.ForexPro.entities.Trade;

public class TradeUtils {
    private final Trade trade;

    public static class Amounts {
        public double amountGBP;
        public double amountUSD;

        public Amounts(Trade trade) {
            this.amountGBP = new TradeUtils(trade).getAmount("GBP");
            this.amountUSD = new TradeUtils(trade).getAmount("USD");
        }
    }

    public Amounts getAmounts() {
        return new Amounts(trade);
    }

    public TradeUtils(Trade trade) {
        this.trade = trade;
    }

    private double getAmount(String currency) {
        if(trade.getBaseCurrency().equals(currency)) {
            if(trade.getTradeType().equals("Buy")) return trade.getAmount();

            return -trade.getAmount();
        }

        if(trade.getTradeType().equals("Buy"))
            return -Calculator.convertCurrencies(trade.getAmount(), trade.getExchangeRate());

        return Calculator.convertCurrencies(trade.getAmount(), trade.getExchangeRate());
    }

}
