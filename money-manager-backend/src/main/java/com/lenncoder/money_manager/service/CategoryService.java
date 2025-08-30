package com.lenncoder.money_manager.service;

import com.lenncoder.money_manager.dto.CategoryDTO;

import java.util.List;

public interface CategoryService {
    CategoryDTO saveCategory(CategoryDTO categoryDTO);
    List<CategoryDTO> getCategoriesForCurrentUser();
    List<CategoryDTO> getCategoriesByTypeForCurrentUser(String type);
    CategoryDTO updateCategory(CategoryDTO categoryDTO, Long id);
}
