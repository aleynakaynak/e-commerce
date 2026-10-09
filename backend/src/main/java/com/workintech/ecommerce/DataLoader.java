package com.workintech.ecommerce;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.workintech.ecommerce.entity.Category;
import com.workintech.ecommerce.entity.Product;
import com.workintech.ecommerce.entity.ProductImage;
import com.workintech.ecommerce.entity.Role;
import com.workintech.ecommerce.entity.User;
import com.workintech.ecommerce.repository.CategoryRepository;
import com.workintech.ecommerce.repository.ProductRepository;
import com.workintech.ecommerce.repository.RoleRepository;
import com.workintech.ecommerce.repository.UserRepository;
import com.workintech.ecommerce.service.AuthService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

// uygulama ilk acildiginda veritabani bossa ornek verileri ekler
// kategori ve urunler resources/seed-data.json dosyasindan okunur
@Component
public class DataLoader implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final AuthService authService;

    public DataLoader(RoleRepository roleRepository, UserRepository userRepository,
                      CategoryRepository categoryRepository, ProductRepository productRepository,
                      AuthService authService) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.authService = authService;
    }

    @Override
    public void run(String... args) throws IOException {
        if (roleRepository.count() > 0) {
            return;
        }

        // roller: id 1 admin, 2 store, 3 customer
        Role admin = saveRole("Yönetici", "admin");
        Role store = saveRole("Mağaza", "store");
        Role customer = saveRole("Müşteri", "customer");

        // test kullanicilari (sifre: 123456)
        saveUser("Admin", "admin@commerce.com", admin);
        saveUser("Store", "store@commerce.com", store);
        saveUser("Customer", "customer@commerce.com", customer);

        JsonNode seed;
        try (InputStream input = new ClassPathResource("seed-data.json").getInputStream()) {
            seed = new ObjectMapper().readTree(input);
        }

        // kategoriler (kod -> id eslesmesi urunler icin tutuluyor)
        Map<String, Long> categoryIds = new HashMap<>();
        for (JsonNode node : seed.get("categories")) {
            Category category = new Category();
            category.setCode(node.get("code").asText());
            category.setTitle(node.get("title").asText());
            category.setGender(node.get("gender").asText());
            category.setRating(node.get("rating").asDouble());
            category.setImg(node.get("img").asText());
            category = categoryRepository.save(category);
            categoryIds.put(category.getCode(), category.getId());
        }

        // urunler
        for (JsonNode node : seed.get("products")) {
            Product product = new Product();
            product.setName(node.get("name").asText());
            product.setDescription(node.get("description").asText());
            product.setPrice(node.get("price").asDouble());
            product.setStock(node.get("stock").asInt());
            product.setStoreId(1L);
            product.setCategoryId(categoryIds.get(node.get("category_code").asText()));
            product.setRating(node.get("rating").asDouble());
            product.setSellCount(node.get("sell_count").asInt());

            ProductImage image = new ProductImage();
            image.setUrl(node.get("image").asText());
            image.setIndex(0);
            product.getImages().add(image);

            productRepository.save(product);
        }
    }

    private Role saveRole(String name, String code) {
        Role role = new Role();
        role.setName(name);
        role.setCode(code);
        return roleRepository.save(role);
    }

    private void saveUser(String name, String email, Role role) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(authService.encodePassword("123456"));
        user.setRoleId(role.getId());
        userRepository.save(user);
    }
}
