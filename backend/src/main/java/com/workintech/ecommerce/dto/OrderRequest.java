package com.workintech.ecommerce.dto;

import java.time.LocalDateTime;
import java.util.List;

public record OrderRequest(
        Long addressId,
        LocalDateTime orderDate,
        Long cardNo,
        String cardName,
        Integer cardExpireMonth,
        Integer cardExpireYear,
        Integer cardCcv,
        Double price,
        List<OrderProductRequest> products) {
}
