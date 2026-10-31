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
import com.lerneon.backend.models.entity.Module;
import com.lerneon.backend.models.entity.Outcome;
import com.lerneon.backend.models.entity.Requirement;
import com.lerneon.backend.models.entity.Resource;
import com.lerneon.backend.models.entity.Role;
import com.lerneon.backend.models.entity.User;
import com.lerneon.backend.models.enums.AccountProvider;
import com.lerneon.backend.models.enums.Difficulty;
import com.lerneon.backend.models.enums.Visibility;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.repositories.CourseRepository;
import com.lerneon.backend.repositories.ModuleRepository;
import com.lerneon.backend.repositories.ResourceRepository;
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
        // private final CourseService courseService;
        private final ModuleRepository moduleRepository;
        // private final ModuleService moduleService;
        private final ResourceRepository resourceRepository;

        @Override
        public void run(String... args) {
                if (roleRepository.count() == 0) {
                        initializeRoles();
                } else {
                        log.info("Roles already seeded, skipping role initialization.");
                }
                if (categoryService.getAllCategories().isEmpty()) {
                        initializeCategories();
                } else {
                        log.info("Categories already seeded, skipping category initialization.");
                }
                if (userRepository.count() == 0) {
                        initializeUsers();
                } else {
                        log.info("Users already seeded, skipping user initialization.");
                }
                if (courseRepository.count() == 0) {
                        initializeCourses();
                } else {
                        log.info("Courses already seeded, skipping course initialization.");
                }
        }

        void initializeRoles() {
                roleRepository.save(Role.builder()
                                .name("ROLE_USER")
                                .build());
                roleRepository.save(Role.builder()
                                .name("ROLE_ADMIN")
                                .build());
        }

        void initializeCategories() {
                List<String> names = List.of(
                                "Web Development",
                                "Mobile Development",
                                "Data Science",
                                "UI/UX Design",
                                "DevOps & Cloud",
                                "Digital Marketing");
                for (String name : names) {
                        categoryService.createCategory(Category.builder().name(name).build());
                }
        }

        void initializeUsers() {
                List<Role> roles = new ArrayList<>();
                roles.add(roleRepository.findByName("ROLE_USER").orElseThrow(
                                () -> new ResourceNotFoundException("Role was not found.")));
                userRepository.save(User.builder()
                                .email("rovineshutabarat23@gmail.com")
                                .username("rovines")
                                .password(passwordEncoder.encode("rovines"))
                                .isVerified(true)
                                .roles(roles)
                                .accountProvider(AccountProvider.LOCAL)
                                .canUpdatePassword(false)
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
                User instructor = userService.findUserByEmail("rovineshutabarat23@gmail.com");

                List<Course> courses = List.of(
                                buildCourse("Java Spring Boot Fundamental",
                                                "Learn Spring Boot from scratch with real-world examples, Spring Data JPA, and Security.",
                                                new BigDecimal("149000"), resolveCategory(1), Difficulty.BEGINNER,
                                                instructor,
                                                List.of("Basic Java knowledge is recommended",
                                                                "Laptop or PC with minimum 8GB RAM"),
                                                List.of("Understand Spring Boot fundamentals",
                                                                "Build secure REST API with Spring Boot"),
                                                List.of(new String[] { "Is this course suitable for beginners?",
                                                                "Yes, this course starts from zero and is beginner friendly." },
                                                                new String[] { "Do I need Java experience before enrolling?",
                                                                                "Basic Java knowledge is recommended but not mandatory." })),
                                buildCourse("React JS Fundamental",
                                                "Learn modern React from components, hooks, routing, to consuming REST APIs.",
                                                new BigDecimal("129000"), resolveCategory(1), Difficulty.BEGINNER,
                                                instructor,
                                                List.of("Basic HTML, CSS, and JavaScript knowledge",
                                                                "Laptop or PC for hands-on practice"),
                                                List.of("Build interactive UI with React components",
                                                                "Manage state with hooks and consume REST API"),
                                                List.of(new String[] {
                                                                "Is this course suitable for frontend beginners?",
                                                                "Yes, we start from components and progress step by step." },
                                                                new String[] { "Which React version is used in this course?",
                                                                                "We use the latest stable React with functional components and hooks." })),
                                buildCourse("Next.js Fullstack Development",
                                                "Build production-ready fullstack apps with Next.js, App Router, Prisma, and authentication.",
                                                new BigDecimal("199000"), resolveCategory(1), Difficulty.INTERMEDIATE,
                                                instructor,
                                                List.of("Solid React JS fundamentals are required",
                                                                "Basic understanding of REST API concepts"),
                                                List.of("Build fullstack app with Next.js App Router",
                                                                "Implement authentication and database with Prisma"),
                                                List.of(new String[] {
                                                                "Do I need to master React before taking this course?",
                                                                "Yes, basic React knowledge is required to follow the material." },
                                                                new String[] { "Does this course cover deployment to production?",
                                                                                "Yes, we cover build optimization and deployment at the end." })),
                                buildCourse("Flutter Mobile Development Pemula",
                                                "Belajar membuat aplikasi Android dan iOS dengan Flutter dan Dart dari nol.",
                                                new BigDecimal("149000"), resolveCategory(2), Difficulty.BEGINNER,
                                                instructor,
                                                List.of("Basic programming logic with any language",
                                                                "Laptop or PC with Android Studio installed"),
                                                List.of("Understand Dart language fundamentals",
                                                                "Build and publish a simple Flutter mobile app"),
                                                List.of(new String[] {
                                                                "Apakah course ini cocok untuk pemula mobile programming?",
                                                                "Ya, materi dimulai dari instalasi sampai build aplikasi pertama." },
                                                                new String[] { "Apakah perlu punya HP Android untuk praktek?",
                                                                                "Tidak wajib, kamu bisa memakai emulator Android Studio." })),
                                buildCourse("Kotlin Android Development",
                                                "Build native Android apps with Kotlin, Jetpack Compose, and MVVM architecture.",
                                                new BigDecimal("179000"), resolveCategory(2), Difficulty.INTERMEDIATE,
                                                instructor,
                                                List.of("Basic Kotlin programming knowledge is needed",
                                                                "Android Studio installed on your computer"),
                                                List.of("Build native UI with Jetpack Compose",
                                                                "Apply MVVM architecture and consume REST API"),
                                                List.of(new String[] {
                                                                "Do I need Java background for this Kotlin course?",
                                                                "No, basic programming logic is enough to get started." },
                                                                new String[] { "Does this course use Jetpack Compose or XML?",
                                                                                "We focus on Jetpack Compose as the modern standard." })),
                                buildCourse("Python untuk Data Analysis",
                                                "Belajar analisis data dengan Python, Pandas, NumPy, dan visualisasi Matplotlib.",
                                                new BigDecimal("139000"), resolveCategory(3), Difficulty.BEGINNER,
                                                instructor,
                                                List.of("Basic Python programming knowledge is helpful",
                                                                "Laptop or PC with Python installed"),
                                                List.of("Process datasets with Pandas and NumPy",
                                                                "Create insightful charts with Matplotlib"),
                                                List.of(new String[] {
                                                                "Apakah perlu background statistika untuk ikut course ini?",
                                                                "Tidak, konsep statistika dasar dijelaskan di dalam course." },
                                                                new String[] { "Dataset apa yang dipakai untuk latihan praktek?",
                                                                                "Kita memakai dataset publik e-commerce dan penjualan ritel." })),
                                buildCourse("Machine Learning Dasar dengan Python",
                                                "Pahami konsep machine learning, regresi, klasifikasi, dan evaluasi model dengan Scikit-Learn.",
                                                new BigDecimal("249000"), resolveCategory(3), Difficulty.ADVANCE,
                                                instructor,
                                                List.of("Strong Python and basic statistics knowledge",
                                                                "Familiarity with Pandas and NumPy libraries"),
                                                List.of("Understand core machine learning concepts clearly",
                                                                "Train and evaluate models with Scikit-Learn"),
                                                List.of(new String[] {
                                                                "Apakah matematika yang berat dibahas di course ini?",
                                                                "Kita fokus ke intuisi dan praktek, bukan pembuktian matematis." },
                                                                new String[] { "Apakah ada project akhir di course ini?",
                                                                                "Ya, kamu akan membangun model prediksi harga rumah." })),
                                buildCourse("UI/UX Design dengan Figma",
                                                "Belajar riset pengguna, wireframing, design system, dan prototyping dengan Figma.",
                                                new BigDecimal("99000"), resolveCategory(4), Difficulty.BEGINNER,
                                                instructor,
                                                List.of("No design background is required to join",
                                                                "Free Figma account for design practice"),
                                                List.of("Create wireframes and interactive prototypes",
                                                                "Build a consistent design system in Figma"),
                                                List.of(new String[] {
                                                                "Apakah course ini cocok untuk yang belum bisa desain?",
                                                                "Sangat cocok, kita mulai dari prinsip dasar desain." },
                                                                new String[] { "Apakah ada tugas portofolio di course ini?",
                                                                                "Ya, kamu akan membuat studi kasus aplikasi mobile." })),
                                buildCourse("Docker & Kubernetes untuk Pemula",
                                                "Pahami containerization, image, volume, networking, sampai orkestrasi Kubernetes dasar.",
                                                new BigDecimal("199000"), resolveCategory(5), Difficulty.INTERMEDIATE,
                                                instructor,
                                                List.of("Basic Linux command line knowledge is needed",
                                                                "Computer with Docker support enabled"),
                                                List.of("Containerize applications with Docker correctly",
                                                                "Deploy and manage apps on Kubernetes cluster"),
                                                List.of(new String[] { "Apakah perlu pengalaman DevOps sebelum ikut?",
                                                                "Tidak, course ini dirancang untuk backend developer pemula." },
                                                                new String[] { "Apakah materi Kubernetes dibahas sampai production?",
                                                                                "Kita bahas sampai deployment dasar dan service discovery." })),
                                buildCourse("AWS Cloud Practitioner",
                                                "Persiapan sertifikasi AWS Cloud Practitioner: EC2, S3, RDS, IAM, VPC, dan billing.",
                                                new BigDecimal("299000"), resolveCategory(5), Difficulty.BEGINNER,
                                                instructor,
                                                List.of("Basic networking and web concepts are helpful",
                                                                "Free AWS account for hands-on labs"),
                                                List.of("Understand core AWS services and use cases",
                                                                "Pass the AWS Cloud Practitioner exam confidently"),
                                                List.of(new String[] {
                                                                "Apakah course ini cukup untuk lulus sertifikasi AWS?",
                                                                "Ya, materi disusun mengikuti exam guide resmi AWS." },
                                                                new String[] { "Apakah ada lab praktek langsung di AWS console?",
                                                                                "Ya, setiap modul dilengkapi demo langsung di console." })),
                                buildCourse("SEO & Content Marketing",
                                                "Naikkan trafik organik dengan riset keyword, on-page SEO, dan strategi konten.",
                                                new BigDecimal("79000"), resolveCategory(6), Difficulty.BEGINNER,
                                                instructor,
                                                List.of("No technical background is required at all",
                                                                "Willingness to write and publish content"),
                                                List.of("Perform keyword research and on-page SEO audits",
                                                                "Build a 30-day content marketing action plan"),
                                                List.of(new String[] {
                                                                "Apakah course ini cocok untuk pemilik bisnis kecil?",
                                                                "Ya, strateginya praktis untuk blog dan toko online." },
                                                                new String[] { "Tools apa saja yang dipakai dalam course ini?",
                                                                                "Kita memakai Google Search Console dan tools gratis lainnya." })),
                                buildCourse("Pengenalan Programming dengan JavaScript",
                                                "Course gratis untuk memahami variabel, fungsi, array, dan logika dasar JavaScript.",
                                                BigDecimal.ZERO, resolveCategory(1), Difficulty.BEGINNER,
                                                instructor,
                                                List.of("No prior programming experience is needed",
                                                                "Browser and text editor are enough"),
                                                List.of("Understand JavaScript syntax and basic logic",
                                                                "Build a simple interactive web page project"),
                                                List.of(new String[] {
                                                                "Apakah course gratis ini benar-benar untuk nol pengalaman?",
                                                                "Ya, ini titik awal terbaik sebelum lanjut ke React." },
                                                                new String[] { "Apakah ada sertifikat setelah menyelesaikan course ini?",
                                                                                "Ya, kamu mendapatkan sertifikat penyelesaian gratis." })));

                for (Course course : courses) {
                        courseRepository.save(course);
                }

                Course course = courseRepository.findById(1).orElseThrow(
                                () -> new ResourceNotFoundException("Course was not found"));

                List<Module> modules = new ArrayList<>();
                List<Resource> resources = new ArrayList<>();

                for (int i = 1; i <= 5; i++) {
                        Module module = Module.builder()
                                        .title("Module " + i)
                                        .orderNumber(i)
                                        .course(course)
                                        .build();

                        moduleRepository.save(module);

                        for (int j = 1; j <= 3; j++) {
                                Resource resource = Resource.builder()
                                                .title("Resource " + j)
                                                .orderNumber(j)
                                                .url("uploads/stream/12039d5f-a97a-42e2-861d-5920e24c09b1/master.m3u8")
                                                .isAvailable(true)
                                                .module(module)
                                                .build();

                                resources.add(resource);
                        }

                        modules.add(module);
                }

                resourceRepository.saveAll(resources);

                log.info("Seeded {} modules and {} resources.",
                                modules.size(), resources.size());
        }

        private Category resolveCategory(int id) {
                try {
                        return categoryService.getCategoryById(id);
                } catch (Exception e) {
                        List<Category> all = categoryService.getAllCategories();
                        if (all != null && !all.isEmpty()) {
                                return all.get(0);
                        }
                        throw e;
                }
        }

        private String slug(String title) {
                String s = title.toLowerCase().replaceAll("[^a-z0-9]+", "-");
                return s.replaceAll("^-+", "").replaceAll("-+$", "");
        }

        private Course buildCourse(String title, String description, BigDecimal price, Category category,
                        Difficulty difficulty, User instructor, List<String> requirements, List<String> outcomes,
                        List<String[]> faqs) {
                List<Requirement> reqList = new ArrayList<>();
                for (String name : requirements) {
                        reqList.add(Requirement.builder().name(name).build());
                }
                List<Outcome> outList = new ArrayList<>();
                for (String name : outcomes) {
                        outList.add(Outcome.builder().name(name).build());
                }
                List<Faq> faqList = new ArrayList<>();
                for (String[] qa : faqs) {
                        faqList.add(Faq.builder().question(qa[0]).answer(qa[1]).build());
                }
                return Course.builder().title(title)
                                .slug(slug(title))
                                .description(description)
                                .instructor(instructor)
                                .price(price)
                                .category(category)
                                .difficulty(difficulty)
                                .visibility(Visibility.PUBLIC)
                                .requirements(reqList)
                                .outcomes(outList)
                                .faqs(faqList)
                                .image(Image.builder().fileName("course-thumbnail.jpg")
                                                .path("uploads/7759cdb8-e877-4af3-b92d-987a3c17644b.png")
                                                .build())
                                .banner(Image.builder().fileName("course-wallpaper.jpg").path(
                                                "uploads/7759cdb8-e877-4af3-b92d-987a3c17644b.png")
                                                .build())
                                .build();
        }
}
