package com.MunizMat.ForexPro.repositories;

import com.MunizMat.ForexPro.entities.Trade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TradeRepository extends JpaRepository<Trade, Long> {
}
