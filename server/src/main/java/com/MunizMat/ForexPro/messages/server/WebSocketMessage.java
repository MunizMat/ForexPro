package com.MunizMat.ForexPro.messages.server;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        property = "event"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = SendRatesMessage.class, name = "sendRates"),
        @JsonSubTypes.Type(value = UserIDMessage.class, name = "userId")
})
@Data
public abstract class WebSocketMessage<T> {
    protected T data;

    public WebSocketMessage(){}

    public WebSocketMessage(T data){
        this.data = data;
    }

    public abstract void setData(T data);
}
