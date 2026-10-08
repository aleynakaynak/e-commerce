package com.workintech.ecommerce.controller;

import com.workintech.ecommerce.entity.CreditCard;
import com.workintech.ecommerce.entity.User;
import com.workintech.ecommerce.repository.CreditCardRepository;
import com.workintech.ecommerce.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

// giris yapmis kullanicinin kart islemleri
@RestController
@RequestMapping("/user/card")
public class CardController {

    private final CreditCardRepository repository;
    private final AuthService authService;

    public CardController(CreditCardRepository repository, AuthService authService) {
        this.repository = repository;
        this.authService = authService;
    }

    @GetMapping
    public List<CreditCard> getAll(HttpServletRequest httpRequest) {
        User user = authService.requireUser(httpRequest);
        return repository.findByUserId(user.getId());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CreditCard create(@RequestBody CreditCard card, HttpServletRequest httpRequest) {
        User user = authService.requireUser(httpRequest);
        card.setId(null);
        card.setUserId(user.getId());
        return repository.save(card);
    }

    @PutMapping
    public CreditCard update(@RequestBody CreditCard card, HttpServletRequest httpRequest) {
        User user = authService.requireUser(httpRequest);
        findOwned(card.getId(), user);
        card.setUserId(user.getId());
        return repository.save(card);
    }

    @DeleteMapping("/{id}")
    public Map<String, String> delete(@PathVariable Long id, HttpServletRequest httpRequest) {
        User user = authService.requireUser(httpRequest);
        repository.delete(findOwned(id, user));
        return Map.of("message", "Deleted.");
    }

    // kayit yoksa ya da baska kullaniciya aitse 404
    private CreditCard findOwned(Long id, User user) {
        if (id == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "id zorunlu");
        }
        CreditCard found = repository.findById(id).orElse(null);
        if (found == null || !found.getUserId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Kayit bulunamadi");
        }
        return found;
    }
}
