package com.MunizMat.ForexPro.messages.forexapi;

import com.MunizMat.ForexPro.enums.ForexAPIWebSocketEventType;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.EqualsAndHashCode;

import java.util.List;
import java.util.UUID;


@EqualsAndHashCode(callSuper = true)
@lombok.Data
public class GetCurrencyRateResponseMessage extends ForexAPIWebSocketMessage<GetCurrencyRateResponseMessage.Data> {
    private final Long cmd_id = 22999L;
    private Data data;

    @lombok.Data
    public static class Symbol {
        @JsonProperty
        private String code;
    }

    @lombok.Data
    public static class Data {
        @lombok.Data
        public static class Price {
            private String price;
            private String volume;
        }

        private String code;
        private String seq;
        private String tick_time;
        private Price[] bids;
        private Price[] asks;
    }

    public GetCurrencyRateResponseMessage(){
        super(ForexAPIWebSocketEventType.GET_RATES_RESPONSE, new Data());
    }
}
