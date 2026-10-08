package com.workintech.ecommerce.controller;

import com.workintech.ecommerce.entity.Address;
import com.workintech.ecommerce.entity.User;
import com.workintech.ecommerce.repository.AddressRepository;
import com.workintech.ecommerce.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

// giris yapmis kullanicinin adres islemleri
@RestController
@RequestMapping("/user/address")
public class AddressController {

    private final AddressRepository repository;
    private final AuthService authService;

    public AddressController(AddressRepository repository, AuthService authService) {
        this.repository = repository;
        this.authService = authService;
    }

    @GetMapping
    public List<Address> getAll(HttpServletRequest httpRequest) {
        User user = authService.requireUser(httpRequest);
        return repository.findByUserId(user.getId());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Address create(@RequestBody Address address, HttpServletRequest httpRequest) {
        User user = authService.requireUser(httpRequest);
        address.setId(null);
        address.setUserId(user.getId());
        return repository.save(address);
    }

    @PutMapping
    public Address update(@RequestBody Address address, HttpServletRequest httpRequest) {
        User user = authService.requireUser(httpRequest);
        findOwned(address.getId(), user);
        address.setUserId(user.getId());
        return repository.save(address);
    }

    @DeleteMapping("/{id}")
    public Map<String, String> delete(@PathVariable Long id, HttpServletRequest httpRequest) {
        User user = authService.requireUser(httpRequest);
        repository.delete(findOwned(id, user));
        return Map.of("message", "Deleted.");
    }

    // kayit yoksa ya da baska kullaniciya aitse 404
    private Address findOwned(Long id, User user) {
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "id zorunlu");
        }
        Address found = repository.findById(id).orElse(null);
        if (found == null || !found.getUserId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Kayit bulunamadi");
        }
        return found;
    }
}
