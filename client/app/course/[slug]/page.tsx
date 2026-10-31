"use client";

import CheckoutSidebar from "@/components/features/course/course-detail-checkout-sidebar";
import CourseDetailCurriculum from "@/components/features/course/course-detail-curriculum";
import CourseDetailFaq from "@/components/features/course/course-detail-faq";
import CourseDetailHero from "@/components/features/course/course-detail-hero";
import CourseInstructorCard from "@/components/features/course/course-detail-instructor-card";
import CourseReview from "@/components/features/course/course-detail-review";
import Navbar from "@/components/features/course/course-navbar";
import CourseDetailPageSkeleton from "@/components/features/course/course-page-skeleton";
import Footer from "@/components/features/landing/landing-footer";
import { CourseService } from "@/services/course.service";
import { useQuery } from "@tanstack/react-query";
import { notFound, useParams } from "next/navigation";
import { Fragment } from "react";

const CourseDetailPage = () => {
  const params = useParams();

  const slug: string = params.slug as string;

  const { data: course, isLoading } = useQuery({
    queryKey: [`course_${slug}`],
    queryFn: () => CourseService.getCourseBySlug(slug!),
  });

  if (isLoading) return <CourseDetailPageSkeleton />;
  if (!course?.data) return notFound();

  return (
    <Fragment>
      <div className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
        <Navbar title={course?.data.title} />
      </div>

      <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
          <div className="min-w-0 lg:col-span-2">
            <div className="space-y-8">
              <CourseDetailHero course={course.data} />

              <CourseDetailCurriculum slug={course.data.slug} />
              <CourseInstructorCard instructor={course.data.instructor} />
              <CourseDetailFaq faqs={course.data.faqs} />
              <CourseReview />
            </div>
          </div>

          <div className="lg:sticky lg:top-20">
            <CheckoutSidebar price={course.data.price} />
          </div>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};

export default CourseDetailPage;
