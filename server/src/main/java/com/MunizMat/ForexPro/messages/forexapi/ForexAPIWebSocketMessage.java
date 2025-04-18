package com.MunizMat.ForexPro.messages.forexapi;

import com.MunizMat.ForexPro.enums.ForexAPIWebSocketEventType;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        property = "cmd_id"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = GetCurrencyRateMessage.class, name = "22002"),
        @JsonSubTypes.Type(value = GetCurrencyRateResponseMessage.class, name = "22999"),
        @JsonSubTypes.Type(value = HeartBeatMessage.class, name = "22000"),
})
@Data
public abstract class ForexAPIWebSocketMessage<T> {
    private ForexAPIWebSocketEventType event;
    protected T data;

    public ForexAPIWebSocketMessage(){}

    public ForexAPIWebSocketMessage(ForexAPIWebSocketEventType event, T data){
        this.event = event;
        this.data = data;
    }

    public abstract void setData(T data);
}
