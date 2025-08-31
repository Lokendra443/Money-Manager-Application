package com.lenncoder.money_manager.service;

import com.lenncoder.money_manager.dto.IncomeDTO;
import org.springframework.data.domain.Sort;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface IncomeService {

    IncomeDTO addIncome(IncomeDTO incomeDTO);
    List<IncomeDTO> getCurrentIncomesForCurrentUser();
    void deleteIncome(Long incomeId);
    List<IncomeDTO> getLatest5IncomesForCurrentUser();
    BigDecimal getTotalIncomesForCurrentUser();
    List<IncomeDTO> filterIncomes(LocalDate startDate, LocalDate endDate, String keyword, Sort sort);
}
