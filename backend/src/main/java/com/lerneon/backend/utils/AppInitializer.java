package com.lerneon.backend.utils;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.lerneon.backend.models.entity.Category;
import com.lerneon.backend.models.entity.Course;
import com.lerneon.backend.models.entity.Faq;
import com.lerneon.backend.models.entity.Image;
import com.lerneon.backend.models.entity.Outcome;
import com.lerneon.backend.models.entity.Requirement;
import com.lerneon.backend.models.entity.Role;
import com.lerneon.backend.models.entity.User;
import com.lerneon.backend.models.enums.AccountProvider;
import com.lerneon.backend.models.enums.Difficulty;
import com.lerneon.backend.models.enums.Visibility;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.repositories.CourseRepository;
import com.lerneon.backend.repositories.ModuleRepository;
import com.lerneon.backend.repositories.RoleRepository;
import com.lerneon.backend.repositories.UserRepository;
import com.lerneon.backend.services.UserService;
import com.lerneon.backend.services.implementations.CategoryServiceImpl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@AllArgsConstructor
@Slf4j
public class AppInitializer implements CommandLineRunner {
        private final CourseRepository courseRepository;
        private final RoleRepository roleRepository;
        private final CategoryServiceImpl categoryService;
        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final UserService userService;
        private final ModuleRepository moduleRepository;

        @Override
        public void run(String... args) {
                log.info(moduleRepository.findAll().toString());
                initializeRoles();
                initializeCategories();
                initializeUsers();
                initializeCourses();
        }

        void initializeRoles() {
                roleRepository.save(new Role("ROLE_USER"));
                roleRepository.save(new Role("ROLE_ADMIN"));
        }

        void initializeCategories() {
                categoryService.createCategory(Category.builder().name("Category 1").build());
        }

        void initializeUsers() {
                List<Role> roles = new ArrayList<>();
                roles.add(roleRepository.findByName("ROLE_USER").orElseThrow(
                                () -> new ResourceNotFoundException("Role was not found.")));
                userRepository.save(User.builder().email("rovineshutabarat23@gmail.com")
                                .username("rovines").password(passwordEncoder.encode("rovines"))
                                .isVerified(true).roles(roles).provider(AccountProvider.LOCAL)
                                .canChangePassword(false)
                                .image(Image.builder().fileName("profile-picture.jpg").path(
                                                "uploads/7759cdb8-e877-4af3-b92d-987a3c17644b.png")
                                                .build())
                                .build());

                // userRepository.save(User.builder()
                // .email("anjaymabar7769@gmail.com")
                // .username("anjay1")
                // .password(passwordEncoder.encode("anjay1"))
                // .isVerified(false)
                // .roles(roles)
                // .provider(AccountProvider.LOCAL)
                // .canChangePassword(false)
                // .build());
        }

        void initializeCourses() {
                Course course = Course.builder().title("Java Spring Boot Fundamental")
                                .slug("Java Spring Boot Fundamental".toLowerCase().replace(" ",
                                                "-"))
                                .description("Learn Spring Boot from scratch with real-world examples.")
                                .instructor(userService
                                                .findUserByEmail("rovineshutabarat23@gmail.com"))
                                .price(new BigDecimal("100000"))
                                .category(categoryService.findCategoryById(1))
                                .difficulty(Difficulty.valueOf("BEGINNER"))
                                .visibility(Visibility.valueOf("PRIVATE"))
                                .requirements(List.of(
                                                Requirement.builder().name("Basic Java knowledge")
                                                                .build(),
                                                Requirement.builder().name("Laptop or PC").build()))
                                .outcomes(List.of(
                                                Outcome.builder().name("Understand Spring Boot")
                                                                .build(),
                                                Outcome.builder().name("Build REST API").build()))
                                .faqs(List.of(Faq.builder().question("Is this for beginners?")
                                                .answer("Yes, this course is beginner friendly.")
                                                .build(),
                                                Faq.builder().question("Do I need Java experience?")
                                                                .answer("Basic Java is recommended.")
                                                                .build()))
                                .image(Image.builder().fileName("course-thumbnail.jpg").path(
                                                "uploads/7759cdb8-e877-4af3-b92d-987a3c17644b.png")
                                                .build())
                                .banner(Image.builder().fileName("course-wallpaper.jpg").path(
                                                "uploads/7759cdb8-e877-4af3-b92d-987a3c17644b.png")
                                                .build())
                                .build();

                courseRepository.save(course);
        }
}
