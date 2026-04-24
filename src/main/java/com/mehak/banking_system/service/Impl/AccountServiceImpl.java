package com.mehak.banking_system.service.Impl;

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
