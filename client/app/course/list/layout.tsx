import CourseFilter from "@/components/features/course/course-filter";
import CourseNavbar from "@/components/features/course/course-navbar";
import React from "react";

type CourseListLayoutProps = {
  children: React.ReactNode;
};

export default function CourseListLayout({ children }: CourseListLayoutProps) {
  return (
    <section className="flex flex-col">
      <CourseNavbar />
      <div className="flex flex-1 mt-5 mx-4 md:mx-10 gap-10">
        <div className="hidden md:block w-64 shrink-0">
          <CourseFilter />
        </div>

        <div className="flex-1 overflow-x-hidden">{children}</div>
      </div>
    </section>
  );
}
