package com.workintech.ecommerce.service;

import com.workintech.ecommerce.dto.LoginRequest;
import com.workintech.ecommerce.dto.SignupRequest;
import com.workintech.ecommerce.entity.User;
import com.workintech.ecommerce.repository.RoleRepository;
import com.workintech.ecommerce.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public void signup(SignupRequest request) {
        if (request.name() == null || request.email() == null || request.password() == null || request.roleId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "name, email, password ve role_id zorunlu");
        }
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Bu email ile kayitli bir kullanici var");
        }
        if (!roleRepository.existsById(request.roleId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Gecersiz role_id");
        }

        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRoleId(request.roleId());

        // magaza rolunde ek bilgiler geliyor
        if (request.store() != null) {
            user.setStoreName(request.store().name());
            user.setStorePhone(request.store().phone());
            user.setTaxNo(request.store().taxNo());
            user.setBankAccount(request.store().bankAccount());
        }

        userRepository.save(user);
    }

    public Map<String, Object> login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email()).orElse(null);
        if (user == null || !passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email ya da sifre hatali");
        }
        return createTokenResponse(user);
    }

    // token gecerliyse kullanici bilgisini ayni token ile doner
    public Map<String, Object> verify(HttpServletRequest httpRequest) {
        User user = requireUser(httpRequest);
        return toResponse(user);
    }

    // Authorization header'indaki token'a gore kullaniciyi bulur (Bearer oneki yok)
    public User requireUser(HttpServletRequest httpRequest) {
        String token = httpRequest.getHeader("Authorization");
        if (token == null || token.isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token yok");
        }
        return userRepository.findByToken(token)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token gecersiz"));
    }

    public String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    // giriste yeni bir token uretilir ve kullaniciya kaydedilir
    private Map<String, Object> createTokenResponse(User user) {
        user.setToken(UUID.randomUUID().toString());
        userRepository.save(user);
        return toResponse(user);
    }

    private Map<String, Object> toResponse(User user) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("token", user.getToken());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("role_id", user.getRoleId());
        return response;
    }
}
