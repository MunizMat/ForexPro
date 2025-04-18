package com.MunizMat.ForexPro.entities;

import com.MunizMat.ForexPro.utils.TradeUtils;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "users")
@Data
public class User {
    @JsonProperty
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @JsonProperty
    private String name;

    @JsonProperty
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    private String password;

    @JsonProperty
    private double accountBalanceGBP = 5000.0;

    @JsonProperty
    private double accountBalanceUSD = 5000.0;

    @JsonProperty
    @Transient
    private List<Trade> trades;

    public void updateAccountBalance(Trade trade){
        TradeUtils.Amounts amounts = new TradeUtils(trade).getAmounts();

        this.accountBalanceGBP += amounts.amountGBP;
        this.accountBalanceUSD += amounts.amountUSD;
    }
}
