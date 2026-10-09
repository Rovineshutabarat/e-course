package com.lerneon.backend.services;

import java.util.List;

import com.lerneon.backend.models.entity.Category;

public interface CategoryService {
    List<Category> getAllCategories();

    Category getCategoryById(Integer id);

    Category createCategory(Category category);

    Category updateCategory(Integer id, Category category);

    Category deleteCategory(Integer id);
}
