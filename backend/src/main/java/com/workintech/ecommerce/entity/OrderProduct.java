package com.workintech.ecommerce.entity;

import jakarta.persistence.*;

@Embeddable
public class OrderProduct {

    private Long productId;

    @Column(name = "product_count")
    private Integer count;

    private String detail;

    public OrderProduct() {
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }
}
