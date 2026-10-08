package com.workintech.ecommerce.entity;

import jakarta.persistence.*;

@Embeddable
public class ProductImage {

    private String url;

    @Column(name = "image_index")
    private Integer index;

    public ProductImage() {
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }
}
