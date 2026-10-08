package com.workintech.ecommerce.controller;

import com.workintech.ecommerce.dto.LoginRequest;
import com.workintech.ecommerce.dto.SignupRequest;
import com.workintech.ecommerce.entity.Role;
import com.workintech.ecommerce.repository.RoleRepository;
import com.workintech.ecommerce.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class AuthController {

    private final AuthService authService;
    private final RoleRepository roleRepository;

    public AuthController(AuthService authService, RoleRepository roleRepository) {
        this.authService = authService;
        this.roleRepository = roleRepository;
    }

    @GetMapping("/roles")
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> signup(@RequestBody SignupRequest request) {
        authService.signup(request);
        return Map.of("message", "User created.");
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/verify")
    public Map<String, Object> verify(HttpServletRequest httpRequest) {
        return authService.verify(httpRequest);
    }
}
