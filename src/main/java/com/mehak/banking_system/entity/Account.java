//package com.mehak.banking_system.entity;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//@Entity
//@Table(name = "accounts")
//public class Account {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(name="account_number", unique = true, nullable = false)
//    private String accountHolderName;
//    private Double balance;
//}

package com.mehak.banking_system.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Unique Account Number
    @Column(name = "account_number", unique = true, nullable = false, length = 20)
    private String accountNumber;

    // Account Holder Name
    @Column(name = "account_holder_name", nullable = false)
    private String accountHolderName;

    // Balance (use BigDecimal for money)
    @Column(nullable = false)
    private BigDecimal balance;

    // Account Type (SAVINGS / CURRENT)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AccountType accountType;

    // Status (ACTIVE / BLOCKED / CLOSED)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AccountStatus status;

    // Email (optional but realistic)
    @Column(unique = true)
    private String email;

    // Phone number
    private String phoneNumber;

    // Audit fields
    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // Auto set before insert
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.status = AccountStatus.ACTIVE;
    }

    // Auto set before update
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}