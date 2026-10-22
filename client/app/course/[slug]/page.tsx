"use client";

import CourseCheckoutSidebar from "@/components/features/course/detail/course-checkout-sidebar";
import CourseDetailNavbar from "@/components/features/course/detail/course-detail-navbar";
import CourseDetailPageSkeleton from "@/components/features/course/detail/course-detail-page-skeleton";
import CourseFaq from "@/components/features/course/detail/course-faq";
import CourseHero from "@/components/features/course/detail/course-hero";
import CourseInstructor from "@/components/features/course/detail/course-instructor";
import CourseModule from "@/components/features/course/detail/course-module";
import CourseReview from "@/components/features/course/detail/course-review";
import Footer from "@/components/features/main/footer";
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
        <CourseDetailNavbar title={course?.data.title} />
      </div>

      <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
          <div className="min-w-0 lg:col-span-2">
            <div className="space-y-8">
              <CourseHero course={course.data} />

              <CourseModule slug={slug} />
              <CourseInstructor instructor={course.data.instructor} />
              <CourseFaq faqs={course.data.faqs} />
              <CourseReview />
            </div>
          </div>

          <div className="lg:sticky lg:top-20">
            <CourseCheckoutSidebar price={course.data.price} />
          </div>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};

export default CourseDetailPage;
