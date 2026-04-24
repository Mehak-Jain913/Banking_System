//package com.mehak.banking_system.service.Impl;
//
//import com.mehak.banking_system.dto.AccountDto;
//import com.mehak.banking_system.entity.Account;
//import com.mehak.banking_system.mapper.AccountMapper;
//import com.mehak.banking_system.repository.AccountRepository;
//import com.mehak.banking_system.service.AccountService;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class AccountServiceImpl implements AccountService {
//
//    private final AccountRepository accountRepository;
//
//    public AccountServiceImpl(AccountRepository accountRepository) {
//        this.accountRepository = accountRepository;
//    }
//
//    @Override
//    public AccountDto createAccount(AccountDto accountDto) {
//        Account account = AccountMapper.mapToAccount(accountDto);
//        Account savedAccount=accountRepository.save(account);
//        return AccountMapper.mapToAccountDto(savedAccount);
//    }
//    //save method return the saved account object which is then mapped to AccountDto and returned to the caller. This allows the caller to receive the details of the newly created account, including any generated fields such as the account ID.
//
//    @Override
//    public AccountDto getAccountById(Long id) {
//        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account not found with id: " + id));
//        return AccountMapper.mapToAccountDto(account);
//    }
//
//    @Override
//    public AccountDto updateAccount(Long id, AccountDto accountForUpdate) {
//        Account existingAccount = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account not found with id: " + id));
//        if(accountForUpdate.getAccountHolderName() != null){
//            existingAccount.setAccountHolderName(accountForUpdate.getAccountHolderName());
//        }
//        if(accountForUpdate.getBalance() != null){
//            existingAccount.setBalance(accountForUpdate.getBalance());
//        }
//        Account updatedAccount = accountRepository.save(existingAccount);
//        return AccountMapper.mapToAccountDto(updatedAccount);
//    }
//
//    @Override
//    public List<AccountDto> getAllAccounts() {
//        List<Account> accounts = accountRepository.findAll();
//        return accounts.stream().map(AccountMapper::mapToAccountDto).toList();
//    }
//
//    @Override
//    public AccountDto deposit(Long id, Double amount) {
//        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account not found with id: " + id));
//        account.setBalance(account.getBalance() + amount);
//        Account updatedAccount = accountRepository.save(account);
//        return AccountMapper.mapToAccountDto(updatedAccount);
//    }
//
//    @Override
//    public AccountDto withdraw(Long id, Double amount) {
//        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account not found with id: " + id));
//        if(account.getBalance() < amount){
//            throw new RuntimeException("Insufficient balance for withdrawal");
//        }
//        account.setBalance(account.getBalance() - amount);
//        Account updatedAccount = accountRepository.save(account);
//        return AccountMapper.mapToAccountDto(updatedAccount);
//    }
//
//    @Override
//    public AccountDto transfer(Long fromAccountId, Long toAccountId, Double amount) {
//        Account fromAccount = accountRepository.findById(fromAccountId).orElseThrow(() -> new RuntimeException("Source account not found with id: " + fromAccountId));
//        Account toAccount = accountRepository.findById(toAccountId).orElseThrow(() -> new RuntimeException("Destination account not found with id: " + toAccountId));
//
//        if(fromAccount.getBalance() < amount){
//            throw new RuntimeException("Insufficient balance for transfer");
//        }
//
//        fromAccount.setBalance(fromAccount.getBalance() - amount);
//        toAccount.setBalance(toAccount.getBalance() + amount);
//
//        accountRepository.save(fromAccount);
//        accountRepository.save(toAccount);
//
//        return AccountMapper.mapToAccountDto(fromAccount);
//    }
//
//    @Override
//    public String deleteAccount(Long id) {
//        Account account = accountRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Account not found with id: " + id));
//        accountRepository.delete(account);
//        return "Account deleted successfully with id: " + id;
//    }
//}

package com.mehak.banking_system.service.impl;

import com.mehak.banking_system.dto.AccountDto;
import com.mehak.banking_system.entity.Account;
import com.mehak.banking_system.exception.ResourceNotFoundException;
import com.mehak.banking_system.mapper.AccountMapper;
import com.mehak.banking_system.repository.AccountRepository;
import com.mehak.banking_system.service.AccountService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    private final AccountRepository repo;

    public AccountServiceImpl(AccountRepository repo) {
        this.repo = repo;
    }

    private Account getAccount(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found: " + id));
    }

    @Override
    public AccountDto createAccount(AccountDto dto) {
        return AccountMapper.toDto(repo.save(AccountMapper.toEntity(dto)));
    }

    @Override
    public AccountDto getAccountById(Long id) {
        return AccountMapper.toDto(getAccount(id));
    }

    @Override
    public List<AccountDto> getAllAccounts() {
        return repo.findAll().stream().map(AccountMapper::toDto).toList();
    }

    @Override
    public AccountDto deposit(Long id, BigDecimal amount) {
        Account acc = getAccount(id);
        acc.setBalance(acc.getBalance().add(amount));
        return AccountMapper.toDto(repo.save(acc));
    }

    @Override
    public AccountDto withdraw(Long id, BigDecimal amount) {
        Account acc = getAccount(id);
        if (acc.getBalance().compareTo(amount) < 0)
            throw new RuntimeException("Insufficient balance");

        acc.setBalance(acc.getBalance().subtract(amount));
        return AccountMapper.toDto(repo.save(acc));
    }

    @Transactional
    @Override
    public AccountDto transfer(Long fromId, Long toId, BigDecimal amount) {
        Account from = getAccount(fromId);
        Account to = getAccount(toId);

        if (from.getBalance().compareTo(amount) < 0)
            throw new RuntimeException("Insufficient balance");

        from.setBalance(from.getBalance().subtract(amount));
        to.setBalance(to.getBalance().add(amount));

        repo.save(from);
        repo.save(to);

        return AccountMapper.toDto(from);
    }

    @Override
    public void deleteAccount(Long id) {
        repo.delete(getAccount(id));
    }
}
