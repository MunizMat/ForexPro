package com.MunizMat.ForexPro.messages.server;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class SessionIDMessage extends WebSocketMessage<SessionIDMessage.Payload> {
    public SessionIDMessage(Payload data) {
        super(data);
    }

    @Data
    public static class Payload {
        private String sessionId;

        public Payload() {}

        public Payload(String sessionId) {
            this.sessionId = sessionId;
        }
    }

    public void setData(Payload data) {
        this.data = data;
    }
}
