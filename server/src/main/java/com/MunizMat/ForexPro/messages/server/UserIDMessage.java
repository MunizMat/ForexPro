package com.MunizMat.ForexPro.messages.server;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class UserIDMessage extends WebSocketMessage<UserIDMessage.Payload> {
    public UserIDMessage() {
        super(new Payload());
    }

    public UserIDMessage(Payload data) {
        super(data);
    }

    @Data
    public static class Payload {
        private String userId;
    }

    @Override
    public void setData(Payload data) {
        this.data = data;
    }
}
