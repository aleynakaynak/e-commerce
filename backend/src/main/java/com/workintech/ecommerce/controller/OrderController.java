package com.workintech.ecommerce.controller;

import com.workintech.ecommerce.dto.OrderProductRequest;
import com.workintech.ecommerce.dto.OrderRequest;
import com.workintech.ecommerce.entity.Order;
import com.workintech.ecommerce.entity.OrderProduct;
import com.workintech.ecommerce.entity.Product;
import com.workintech.ecommerce.entity.User;
import com.workintech.ecommerce.repository.OrderRepository;
import com.workintech.ecommerce.repository.ProductRepository;
import com.workintech.ecommerce.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order")
public class OrderController {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final AuthService authService;

    public OrderController(OrderRepository orderRepository, ProductRepository productRepository,
                           AuthService authService) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.authService = authService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> createOrder(@RequestBody OrderRequest request, HttpServletRequest httpRequest) {
        User user = authService.requireUser(httpRequest);
        if (request.products() == null || request.products().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sipariste urun yok");
        }

        Order order = new Order();
        order.setUserId(user.getId());
        order.setAddressId(request.addressId());
        order.setOrderDate(request.orderDate() != null ? request.orderDate() : LocalDateTime.now());
        order.setCardNo(request.cardNo());
        order.setCardName(request.cardName());
        order.setCardExpireMonth(request.cardExpireMonth());
        order.setCardExpireYear(request.cardExpireYear());
        order.setPrice(request.price());
        // card_ccv guvenlik nedeniyle veritabanina kaydedilmiyor

        for (OrderProductRequest item : request.products()) {
            OrderProduct orderProduct = new OrderProduct();
            orderProduct.setProductId(item.productId());
            orderProduct.setCount(item.count());
            orderProduct.setDetail(item.detail());
            order.getProducts().add(orderProduct);
        }

        return toResponse(orderRepository.save(order));
    }

    @GetMapping
    public List<Map<String, Object>> getOrders(HttpServletRequest httpRequest) {
        User user = authService.requireUser(httpRequest);
        List<Map<String, Object>> response = new ArrayList<>();
        for (Order order : orderRepository.findByUserIdOrderByIdDesc(user.getId())) {
            response.add(toResponse(order));
        }
        return response;
    }

    // siparisi, urunlerin adi/fiyati/resmi ile birlikte doner
    private Map<String, Object> toResponse(Order order) {
        List<Map<String, Object>> products = new ArrayList<>();
        for (OrderProduct item : order.getProducts()) {
            Map<String, Object> productMap = new LinkedHashMap<>();
            productMap.put("product_id", item.getProductId());
            productMap.put("count", item.getCount());
            productMap.put("detail", item.getDetail());

            Product product = productRepository.findById(item.getProductId()).orElse(null);
            if (product != null) {
                productMap.put("name", product.getName());
                productMap.put("price", product.getPrice());
                productMap.put("images", product.getImages());
            }
            products.add(productMap);
        }

        Map<String, Object> orderMap = new LinkedHashMap<>();
        orderMap.put("id", order.getId());
        orderMap.put("address_id", order.getAddressId());
        orderMap.put("order_date", order.getOrderDate().toString());
        orderMap.put("card_name", order.getCardName());
        orderMap.put("price", order.getPrice());
        orderMap.put("products", products);
        return orderMap;
    }
}
