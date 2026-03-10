"use client";

import Advantages from "@/components/features/main/advantages";
import Blogs from "@/components/features/main/blog";
import Features from "@/components/features/main/features";
import Footer from "@/components/features/main/footer";
import Hero from "@/components/features/main/hero";
import Navbar from "@/components/features/main/navbar";
import NewsLetter from "@/components/features/main/news-letter";
import TopCategories from "@/components/features/main/top-categories";
import TopCourses from "@/components/features/main/top-courses";

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
