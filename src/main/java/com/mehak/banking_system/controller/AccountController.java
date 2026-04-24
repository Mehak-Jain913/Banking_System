package com.mehak.banking_system.controller;
import com.mehak.banking_system.dto.AccountDto;
import com.mehak.banking_system.service.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;

//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/accounts")

public class AccountController {

    private final AccountService service;

    public AccountController(AccountService service) {
        this.service = service;
    }

    @PostMapping("/create")
    public ResponseEntity<AccountDto> create(@RequestBody AccountDto dto) {
        return ResponseEntity.ok(service.createAccount(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountDto> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAccountById(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<AccountDto>> getAll() {
        return ResponseEntity.ok(service.getAllAccounts());
    }

    @PostMapping("/{id}/deposit")
    public ResponseEntity<AccountDto> deposit(@PathVariable Long id, @RequestParam BigDecimal amount) {
        return ResponseEntity.ok(service.deposit(id, amount));
    }

    @PostMapping("/{id}/withdraw")
    public ResponseEntity<AccountDto> withdraw(@PathVariable Long id, @RequestParam BigDecimal amount) {
        return ResponseEntity.ok(service.withdraw(id, amount));
    }

    @PostMapping("/{from}/transfer/{to}")
    public ResponseEntity<AccountDto> transfer(
            @PathVariable Long from,
            @PathVariable Long to,
            @RequestParam BigDecimal amount) {

        return ResponseEntity.ok(service.transfer(from, to, amount));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteAccount(id);
        return ResponseEntity.ok("Account deleted successfully");
    }
}
