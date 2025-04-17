package com.MunizMat.ForexPro.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "trades")
@Data
public class Trade {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonProperty
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonProperty
    private User user;

    @JsonProperty
    String currencyPair;

    @JsonProperty
    String baseCurrency;

    @JsonProperty
    String tradeType;

    @JsonProperty
    double amount;

    @JsonProperty
    double exchangeRate;

    @JsonProperty
    Date createdAt = new Date();
}
