import CourseFilter from "@/components/features/course/course-filter";
import ExploreNavbar from "@/components/features/course/explore-navbar";
import React from "react";

type ExploreLayoutProps = {
  children: React.ReactNode;
};

export default function ExploreLayout({ children }: ExploreLayoutProps) {
  return (
    <section className="flex flex-col mx-8">
      {/* <AuthGuard roles={["ROLE_USER"]}> */}
      <ExploreNavbar />
      <div className="flex flex-1 mt-5 mx-4 md:mx-10 gap-10">
        <div className="hidden md:block w-64 shrink-0">
          <CourseFilter />
        </div>
        <div className="flex-1 overflow-x-hidden">{children}</div>
      </div>
      {/* </AuthGuard> */}
    </section>
  );
}
