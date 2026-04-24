//package com.mehak.banking_system.repository;
//
//import com.mehak.banking_system.entity.Account;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//@Repository
//public interface AccountRepository extends JpaRepository<Account, Long> {
//
//}

package com.mehak.banking_system.repository;

import com.mehak.banking_system.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByAccountNumber(String accountNumber);
}