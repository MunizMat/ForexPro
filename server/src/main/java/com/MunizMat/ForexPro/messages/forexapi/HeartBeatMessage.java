package com.MunizMat.ForexPro.messages.forexapi;

import com.MunizMat.ForexPro.enums.ForexAPIWebSocketEventType;

import java.util.UUID;

public class HeartBeatMessage extends ForexAPIWebSocketMessage<Object> {
    private final Long cmd_id = 22000L;
    private final Long seq_id = 123L;
    private final String trace;

    public HeartBeatMessage(){
        super(ForexAPIWebSocketEventType.HEARTBEAT, null);
        this.trace = UUID.randomUUID().toString();
    }

    @Override
    public void setData(Object data) {

    }

}
