package com.lenncoder.money_manager.controller;

import com.lenncoder.money_manager.dto.ExpenseDTO;
import com.lenncoder.money_manager.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<ExpenseDTO> addExpense(@RequestBody ExpenseDTO expenseDTO) {
        ExpenseDTO savedExpense = expenseService.addExpense(expenseDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedExpense);
    }

    @GetMapping
    public ResponseEntity<List<ExpenseDTO>> getExpenses() {
        List<ExpenseDTO> expenses = expenseService.getCurrentExpensesForCurrentUser();
        return ResponseEntity.ok(expenses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }



}
