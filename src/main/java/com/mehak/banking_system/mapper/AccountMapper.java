package com.mehak.banking_system.mapper;

import com.mehak.banking_system.dto.AccountDto;
import com.mehak.banking_system.entity.Account;

public class AccountMapper {

    public static Account toEntity(AccountDto dto) {
        if (dto == null) return null;

        return Account.builder()
                .id(dto.getId())
                .accountNumber(dto.getAccountNumber())
                .accountHolderName(dto.getAccountHolderName())
                .balance(dto.getBalance())
                .accountType(dto.getAccountType())
                .status(dto.getStatus())
                .email(dto.getEmail())
                .phoneNumber(dto.getPhoneNumber())
                .build();
    }

    public static AccountDto toDto(Account account) {
        if (account == null) return null;

        return AccountDto.builder()
                .id(account.getId())
                .accountNumber(account.getAccountNumber())
                .accountHolderName(account.getAccountHolderName())
                .balance(account.getBalance())
                .accountType(account.getAccountType())
                .status(account.getStatus())
                .email(account.getEmail())
                .phoneNumber(account.getPhoneNumber())
                .build();
    }
}