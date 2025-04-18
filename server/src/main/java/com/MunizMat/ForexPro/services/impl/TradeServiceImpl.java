package com.MunizMat.ForexPro.services.impl;

import com.MunizMat.ForexPro.dtos.CreateTradeDTO;
import com.MunizMat.ForexPro.dtos.RegisterTradeResponseDTO;
import com.MunizMat.ForexPro.entities.Trade;
import com.MunizMat.ForexPro.entities.User;
import com.MunizMat.ForexPro.repositories.TradeRepository;
import com.MunizMat.ForexPro.repositories.UserRepository;
import com.MunizMat.ForexPro.services.TradeService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class TradeServiceImpl implements TradeService {
    private final UserRepository userRepository;
    private final TradeRepository tradeRepository;

    public TradeServiceImpl(UserRepository userRepository, TradeRepository tradeRepository){
        this.userRepository = userRepository;
        this.tradeRepository = tradeRepository;
    }

    @Override
    public CompletableFuture<RegisterTradeResponseDTO> registerTrade(CreateTradeDTO createTradeDTO) {
        return CompletableFuture.supplyAsync(() -> {
            Trade trade = new Trade();
            User user = userRepository.findById(createTradeDTO.userId()).orElseThrow(() -> new RuntimeException("User not found"));

            trade.setTradeType(createTradeDTO.tradeType());
            trade.setAmount(createTradeDTO.amount());
            trade.setBaseCurrency(createTradeDTO.baseCurrency());
            trade.setExchangeRate(createTradeDTO.exchangeRate());
            trade.setCurrencyPair(createTradeDTO.currencyPair());
            user.updateAccountBalance(trade);
            trade.setUser(user);


            trade = saveNewTrade(trade);
            List<Trade> trades = tradeRepository.findAllByUserId((long) user.getId());

            user.setTrades(trades);

            return new RegisterTradeResponseDTO(user, trade);
        });
    }

    @Transactional
    private Trade saveNewTrade(Trade trade){
        userRepository.save(trade.getUser());
        return tradeRepository.save(trade);
    }
}
