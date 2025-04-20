package com.MunizMat.ForexPro.messages.server;

import com.MunizMat.ForexPro.dtos.RegisterTradeResponseDTO;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TradeCompletedMessage extends WebSocketMessage<RegisterTradeResponseDTO> {
    public TradeCompletedMessage(RegisterTradeResponseDTO data) {
        super(data);
    }

    public void setData(RegisterTradeResponseDTO data) {
        this.data = data;
    }
}
