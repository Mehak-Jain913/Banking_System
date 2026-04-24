package com.mehak.banking_system.service;//package com.mehak.banking_system.service;
//
//import com.mehak.banking_system.dto.AccountDto;
//
//import java.util.List;
//
//public interface AccountService {
//
//    AccountDto createAccount(AccountDto account);
//    AccountDto getAccountById(Long id);
//    AccountDto updateAccount(Long id, AccountDto account);
//    List<AccountDto> getAllAccounts();
//    AccountDto deposit(Long id, Double amount);
//    AccountDto withdraw(Long id, Double amount);
//    AccountDto transfer(Long fromAccountId, Long toAccountId, Double amount);
//    String deleteAccount(Long id);
//}

import com.mehak.banking_system.dto.AccountDto;

import java.math.BigDecimal;
import java.util.List;

public interface AccountService {

    AccountDto createAccount(AccountDto dto);
    AccountDto getAccountById(Long id);
    List<AccountDto> getAllAccounts();

    AccountDto deposit(Long id, BigDecimal amount);
    AccountDto withdraw(Long id, BigDecimal amount);
    AccountDto transfer(Long fromId, Long toId, BigDecimal amount);

    void deleteAccount(Long id);
}