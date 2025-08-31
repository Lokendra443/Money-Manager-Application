package com.lenncoder.money_manager.service;

import com.lenncoder.money_manager.dto.ExpenseDTO;
import org.springframework.data.domain.Sort;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface ExpenseService {
    ExpenseDTO addExpense(ExpenseDTO expenseDTO);
    List<ExpenseDTO> getCurrentExpensesForCurrentUser();
    void deleteExpense(Long expenseId);
    List<ExpenseDTO> getLatest5ExpensesForCurrentUser();
    BigDecimal getTotalExpensesForCurrentUser();
    List<ExpenseDTO> filterExpenses(LocalDate startDate, LocalDate endDate, String keyword, Sort sort);
    List<ExpenseDTO> getExpensesForUserOnDate(Long profileId, LocalDate date);
}
