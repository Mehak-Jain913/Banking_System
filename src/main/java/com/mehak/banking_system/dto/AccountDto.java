//package com.mehak.banking_system.dto;
//
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//public class AccountDto {
//    private Long id;
//    private String accountHolderName;
//    private Double balance;
//}

package com.mehak.banking_system.dto;

import com.mehak.banking_system.entity.AccountStatus;
import com.mehak.banking_system.entity.AccountType;
import lombok.*;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AccountDto {

    private Long id;
    private String accountNumber;
    private String accountHolderName;
    private BigDecimal balance;
    private AccountType accountType;
    private AccountStatus status;
    private String email;
    private String phoneNumber;
}
