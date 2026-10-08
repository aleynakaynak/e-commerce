package com.workintech.ecommerce.service;

import com.workintech.ecommerce.entity.Product;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
public class ProductService {

    private final EntityManager entityManager;

    public ProductService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    // category, filter, sort, limit, offset parametrelerinden sorguyu olusturur
    public Map<String, Object> search(Long category, String filter, String sort, int limit, int offset) {
        String where = " where 1 = 1";
        Map<String, Object> params = new HashMap<>();

        if (category != null) {
            where += " and p.categoryId = :category";
            params.put("category", category);
        }
        if (filter != null && !filter.isBlank()) {
            where += " and (lower(p.name) like :filter or lower(p.description) like :filter)";
            params.put("filter", "%" + filter.toLowerCase(Locale.ROOT) + "%");
        }

        // sort: "price:asc", "price:desc", "rating:asc", "rating:desc"
        String orderBy = " order by p.id";
        if (sort != null && sort.contains(":")) {
            String[] parts = sort.split(":");
            boolean validField = parts[0].equals("price") || parts[0].equals("rating");
            boolean validDirection = parts[1].equals("asc") || parts[1].equals("desc");
            if (validField && validDirection) {
                orderBy = " order by p." + parts[0] + " " + parts[1] + ", p.id";
            }
        }

        TypedQuery<Product> query = entityManager.createQuery("select p from Product p" + where + orderBy, Product.class);
        TypedQuery<Long> countQuery = entityManager.createQuery("select count(p) from Product p" + where, Long.class);
        for (Map.Entry<String, Object> param : params.entrySet()) {
            query.setParameter(param.getKey(), param.getValue());
            countQuery.setParameter(param.getKey(), param.getValue());
        }

        List<Product> products = query.setFirstResult(offset).setMaxResults(limit).getResultList();

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("total", countQuery.getSingleResult());
        response.put("products", products);
        return response;
    }
}
