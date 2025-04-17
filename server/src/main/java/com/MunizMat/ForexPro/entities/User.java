package com.MunizMat.ForexPro.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "users")
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

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
