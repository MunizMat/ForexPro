package com.MunizMat.ForexPro.utils;

public class Calculator {
    public static double convertCurrencies(double baseCurrencyAmount, double exchangeRate) {
        return baseCurrencyAmount * exchangeRate;
    }
}
