//package com.mehak.banking_system.controller;
//
//import com.mehak.banking_system.dto.AccountDto;
//import com.mehak.banking_system.service.AccountService;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Map;
//
//@RestController //This is a mvc controller class which will handle the incoming http requests and send the response back to the client. It is responsible for handling the business logic of the application and interacting with the service layer to perform the necessary operations. The @RestController annotation is used to indicate that this class is a controller and that it will handle RESTful web services.
//@RequestMapping("/api/accounts")//This annotation is used to specify the base URL for all the endpoints in this controller. In this case, all the endpoints will start with /api/accounts. For example, if we have an endpoint to create a new account, it will be accessed via /api/accounts/create.
//public class AccountController {
//    private final AccountService accountService;
//
//    public AccountController(AccountService accountService) {
//        this.accountService = accountService;
//    }
//
//    @GetMapping("/all")
//    public ResponseEntity<List<AccountDto>> getAllAccounts() {
//        List<AccountDto> accounts = accountService.getAllAccounts();
//        return ResponseEntity.ok(accounts);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<AccountDto> getAccountById(@PathVariable Long id) {
//        return new ResponseEntity<>(accountService.getAccountById(id), HttpStatus.OK);
//    }
//
//    //Add Account Rest API
//    @PostMapping("/create")//This annotation is used to specify that this method will handle POST requests to the /create endpoint. When a client sends a POST request to /api/accounts/create, this method will be invoked to handle the request and create a new account.
//    public ResponseEntity<AccountDto> addAccount(@RequestBody AccountDto accountDto) {
//        return new ResponseEntity<>(accountService.createAccount(accountDto), HttpStatus.CREATED);
//    }
//
//    @PostMapping("/{id}/deposit")
//    public ResponseEntity<AccountDto> deposit(@PathVariable Long id, @RequestParam Double amount) {
//        return new ResponseEntity<>(accountService.deposit(id, amount), HttpStatus.OK);
//    }//RequestParam is used to extract the amount parameter from the query string of the URL. For example, if a client sends a POST request to /api/accounts/1/deposit?amount=100, the amount parameter will be extracted and passed to the deposit method.
//
//    @PostMapping("/{id}/withdraw")
//    public ResponseEntity<AccountDto> withdraw(@PathVariable Long id, @RequestParam Double amount) {
//        return new ResponseEntity<>(accountService.withdraw(id, amount), HttpStatus.OK);
//    }
//
//    @PutMapping("/{fromAccountId}/transfer/{toAccountId}")
//    public ResponseEntity<AccountDto> transfer(@PathVariable Long fromAccountId, @PathVariable Long toAccountId, @RequestBody Map<String, Double> request) {
//        Double amount = request.get("amount");
//        return new ResponseEntity<>(accountService.transfer(fromAccountId, toAccountId, amount), HttpStatus.OK);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<AccountDto> updateAccount(@PathVariable Long id, @RequestBody AccountDto accountDto) {
//        return new ResponseEntity<>(accountService.updateAccount(id, accountDto), HttpStatus.OK);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteAccount(@PathVariable Long id) {
//        return new ResponseEntity<>(accountService.deleteAccount(id), HttpStatus.OK);
//    }
//
//    @PatchMapping("/{id}")
//    public ResponseEntity<AccountDto> partialUpdateAccount(@PathVariable Long id, @RequestBody AccountDto accountDto) {
//        return new ResponseEntity<>(accountService.updateAccount(id, accountDto), HttpStatus.OK);
//    }
//}

package com.mehak.banking_system.controller;
import com.mehak.banking_system.dto.AccountDto;
import com.mehak.banking_system.service.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;

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
