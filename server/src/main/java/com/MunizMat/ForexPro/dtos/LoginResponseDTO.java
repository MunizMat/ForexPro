package com.MunizMat.ForexPro.dtos;

import com.MunizMat.ForexPro.entities.User;

public record LoginResponseDTO(User user, String token) {
}
