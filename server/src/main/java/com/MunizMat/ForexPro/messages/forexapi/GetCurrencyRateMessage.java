package com.MunizMat.ForexPro.messages.forexapi;

import com.MunizMat.ForexPro.enums.ForexAPIWebSocketEventType;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.EqualsAndHashCode;

import java.util.UUID;


@EqualsAndHashCode(callSuper = true)
@lombok.Data
public class GetCurrencyRateMessage extends ForexAPIWebSocketMessage<GetCurrencyRateMessage.Data> {
    @JsonProperty
    private final Long cmd_id = 22002L;
    @JsonProperty
    private final Long seq_id = 123L;
    @JsonProperty
    private String trace;
    @JsonProperty
    private  Data data;

    @lombok.Data
    public static class Symbol {
        @JsonProperty
        private String code;
    }

    @lombok.Data
    public static class Data {
        @JsonProperty
        private Symbol[] symbol_list;
    }

    public GetCurrencyRateMessage(){
        super(ForexAPIWebSocketEventType.GET_RATES, new Data());
        this.trace = UUID.randomUUID().toString();
        this.data = new Data();
        this.data.symbol_list = new Symbol[1];
        this.data.symbol_list[0] = new Symbol();
        this.data.symbol_list[0].code = "GBPUSD";
    }
}
