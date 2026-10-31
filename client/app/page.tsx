"use client";

import Advantages from "@/components/features/landing/advantages";
import Blogs from "@/components/features/landing/blog";
import Features from "@/components/features/landing/features";
import Footer from "@/components/features/landing/landing-footer";
import Hero from "@/components/features/landing/hero";
import Navbar from "@/components/features/landing/landing-navbar";
import NewsLetter from "@/components/features/landing/newsletter";
import TopCategories from "@/components/features/landing/top-categories";
import TopCourses from "@/components/features/landing/top-courses";

const Page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <TopCategories />
      <TopCourses />
      <Advantages />
      <Blogs />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Page;
