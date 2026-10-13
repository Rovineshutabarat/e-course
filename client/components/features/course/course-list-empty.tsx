"use client";

import { Button } from "@/components/ui/button";
import { useCourseFilters } from "@/hooks/use-course-filters";
import { ArrowRight, SearchX } from "lucide-react";

const CourseListEmpty = () => {
  const { resetFilters } = useCourseFilters();

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
        <SearchX className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="mb-4 text-2xl font-semibold">No Courses Found</h2>
      <p className="mb-8 max-w-md text-center text-sm text-muted-foreground">
        We couldn.t find any courses that match your search. Try adjusting
        your filters or browse all courses instead.
      </p>
      <Button className="cursor-pointer" onClick={() => resetFilters()}>
        <span>Browse All Courses</span>
        <ArrowRight />
      </Button>
    </div>
  );
};

export default CourseListEmpty;
