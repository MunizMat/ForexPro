package com.MunizMat.ForexPro.repositories;

import com.MunizMat.ForexPro.entities.Trade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TradeRepository extends JpaRepository<Trade, Long> {
    List<Trade> findAllByUserId(Long userId);
}
