package com.workintech.ecommerce;

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
import org.springframework.stereotype.Component;

// uygulama ilk acildiginda veritabani bossa ornek verileri ekler
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
    public void run(String... args) {
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

        // kategoriler: { kod, baslik, cinsiyet, puan }
        String[][] categories = {
                {"k:tisort", "Tişört", "k", "4.2"}, {"k:ayakkabi", "Ayakkabı", "k", "4.9"},
                {"k:ceket", "Ceket", "k", "3.8"}, {"k:elbise", "Elbise", "k", "4.1"},
                {"k:etek", "Etek", "k", "3.9"}, {"k:gomlek", "Gömlek", "k", "3.1"},
                {"k:kazak", "Kazak", "k", "2.9"}, {"k:pantalon", "Pantalon", "k", "3.8"},
                {"e:ayakkabi", "Ayakkabı", "e", "4.6"}, {"e:ceket", "Ceket", "e", "4.1"},
                {"e:gomlek", "Gömlek", "e", "3.9"}, {"e:kazak", "Kazak", "e", "3.2"},
                {"e:pantalon", "Pantalon", "e", "3.5"}, {"e:tisort", "Tişört", "e", "4.3"},
        };
        String[] colors = {"Siyah", "Beyaz", "Mavi", "Kırmızı", "Yeşil", "Gri", "Lacivert", "Bej"};

        for (String[] row : categories) {
            Category category = new Category();
            category.setCode(row[0]);
            category.setTitle(row[1]);
            category.setGender(row[2]);
            category.setRating(Double.parseDouble(row[3]));
            category.setImg("https://picsum.photos/seed/category-" + row[0].replace(":", "-") + "/400/500");
            category = categoryRepository.save(category);

            // her kategoriye 8 ornek urun
            for (int i = 0; i < colors.length; i++) {
                String gender = row[2].equals("k") ? "Kadın" : "Erkek";
                Product product = new Product();
                product.setName(colors[i] + " " + gender + " " + row[1]);
                product.setDescription(colors[i] + " renk, rahat kalıp " + gender.toLowerCase() + " " + row[1].toLowerCase()
                        + ". Günlük kullanıma uygun.");
                product.setPrice(Math.round((99.99 + category.getId() * 20 + i * 15) * 100) / 100.0);
                product.setStock(20 + i * 5);
                product.setStoreId(1L);
                product.setCategoryId(category.getId());
                product.setRating(Math.round((3.0 + (i % 5) * 0.4) * 100) / 100.0);
                product.setSellCount(50 + i * 37);

                ProductImage image = new ProductImage();
                image.setUrl("https://picsum.photos/seed/product-" + category.getId() + "-" + i + "/600/800");
                image.setIndex(0);
                product.getImages().add(image);

                productRepository.save(product);
            }
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
