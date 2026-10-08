package com.workintech.ecommerce.dto;

public record OrderProductRequest(Long productId, Integer count, String detail) {
}
