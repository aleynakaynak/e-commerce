package com.workintech.ecommerce.dto;

// { name, email, password, role_id, store: { name, phone, tax_no, bank_account } }
public record SignupRequest(String name, String email, String password, Long roleId, StoreRequest store) {
}
