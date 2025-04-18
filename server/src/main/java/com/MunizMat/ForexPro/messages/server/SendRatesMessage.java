package com.MunizMat.ForexPro.messages.server;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Data
public class SendRatesMessage extends WebSocketMessage<SendRatesMessage.Payload> {
    public SendRatesMessage(Payload data) {
        super(data);
    }

    @Data
    public static class Payload {
        private double askPrice;
        private double bidPrice;
        private long updatedAt;
        private String symbol;

        public Payload() {}

        public Payload(double askPrice, double bidPrice, long updatedAt, String symbol) {
            this.askPrice = askPrice;
            this.bidPrice = bidPrice;
            this.updatedAt = updatedAt;
            this.symbol = symbol;
        }
    }

    public void setData(Payload data) {
        this.data = data;
    }
}
