package com.MunizMat.ForexPro.dtos;

import com.MunizMat.ForexPro.entities.Trade;
import com.MunizMat.ForexPro.entities.User;

public record RegisterTradeResponseDTO(User updatedUser, Trade newTrade) {
}
