package com.lerneon.backend.services.implementations;

import java.util.List;

import org.springframework.stereotype.Service;

import com.lerneon.backend.models.entity.Category;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.repositories.CategoryRepository;
import com.lerneon.backend.services.CategoryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Integer id) {
        return categoryRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Category was not found."));
    }

    @Override
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Integer id, Category category) {
        getCategoryById(id);
        category.setId(id);
        return categoryRepository.save(category);
    }

    @Override
    public Category deleteCategory(Integer id) {
        Category category = getCategoryById(id);
        categoryRepository.delete(category);
        return category;
    }
}
