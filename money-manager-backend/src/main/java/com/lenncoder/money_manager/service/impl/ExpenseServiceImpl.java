package com.lenncoder.money_manager.service.impl;

import com.lenncoder.money_manager.dto.ExpenseDTO;
import com.lenncoder.money_manager.entity.CategoryEntity;
import com.lenncoder.money_manager.entity.ExpenseEntity;
import com.lenncoder.money_manager.entity.ProfileEntity;
import com.lenncoder.money_manager.repository.CategoryRepository;
import com.lenncoder.money_manager.repository.ExpenseRepository;
import com.lenncoder.money_manager.service.ExpenseService;
import com.lenncoder.money_manager.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseServiceImpl implements ExpenseService {
    private final CategoryRepository categoryRepository;
    private final ExpenseRepository expenseRepository;
    private final ProfileService profileService;


    // Adds a new expense to the database
    @Override
    public ExpenseDTO addExpense(ExpenseDTO expenseDTO) {
        ProfileEntity profile = profileService.getCurrentProfile();
        CategoryEntity category = categoryRepository.findById(expenseDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        ExpenseEntity newExpense = toEntity(expenseDTO, profile, category);
        newExpense = expenseRepository.save(newExpense);
        return toDTO(newExpense);
    }


    // Retrieves all expenses for current month/based on the start date and end date
    public List<ExpenseDTO> getCurrentExpensesForCurrentUser() {
        ProfileEntity profile = profileService.getCurrentProfile();
        LocalDate now = LocalDate.now();
        LocalDate startDate = now.withDayOfMonth(1);
        LocalDate endDate = now.withDayOfMonth(now.lengthOfMonth());
        List<ExpenseEntity> list = expenseRepository.findByProfileIdAndDateBetween(profile.getId(), startDate, endDate);
        return list.stream().map(this::toDTO).toList();
    }

    // Delete expense by id for current user
    public void deleteExpense(Long expenseId) {
        ProfileEntity profile = profileService.getCurrentProfile();
        ExpenseEntity entity = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));
        if (!entity.getProfile().getId().equals(profile.getId())) {
            throw new RuntimeException("Unauthorized to delete this expense");
        }
        expenseRepository.delete(entity);
    }

    // Get latest 5 expenses for current user
    public List<ExpenseDTO> getLatest5ExpensesForCurrentUser() {
        ProfileEntity profile = profileService.getCurrentProfile();
        List<ExpenseEntity> top5List = expenseRepository.findTop5ByProfileIdOrderByDateDesc(profile.getId());
        return top5List.stream().map(this::toDTO).toList();
    }

    // Get total expenses for current user
    public BigDecimal getTotalExpensesForCurrentUser() {
        ProfileEntity profile = profileService.getCurrentProfile();
        BigDecimal totalExpenses = expenseRepository.findTotalExpenseByProfileId(profile.getId());
        return totalExpenses != null ? totalExpenses : BigDecimal.ZERO;
    }

    // Filter expenses
    public List<ExpenseDTO> filterExpenses(LocalDate startDate, LocalDate endDate, String keyword, Sort sort) {
        ProfileEntity profile = profileService.getCurrentProfile();
        List<ExpenseEntity> list = expenseRepository.findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(profile.getId(), startDate, endDate, keyword, sort);
        return list.stream().map(this::toDTO).toList();
    }

    // Notification
    public List<ExpenseDTO> getExpensesForUserOnDate(Long profileId, LocalDate date) {
        List<ExpenseEntity> list = expenseRepository.findByProfileIdAndDate(profileId, date);
        return list.stream().map(this::toDTO).toList();
    }







    // helper methods
    private ExpenseEntity toEntity(ExpenseDTO dto, ProfileEntity profile, CategoryEntity category) {
        return ExpenseEntity.builder()
                .name(dto.getName())
                .icon(dto.getIcon())
                .amount(dto.getAmount())
                .date(dto.getDate())
                .profile(profile)
                .category(category)
                .build();
    }

    private ExpenseDTO toDTO(ExpenseEntity entity) {
        return ExpenseDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .icon(entity.getIcon())
                .categoryId(entity.getCategory() != null ? entity.getCategory().getId() : null)
                .categoryName(entity.getCategory() != null ? entity.getCategory().getName() : "N/A")
                .amount(entity.getAmount())
                .date(entity.getDate())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();

    }


}
