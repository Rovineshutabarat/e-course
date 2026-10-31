"use client";

import CategoryBadges from "@/components/features/course/category-badges";
import CourseCard from "@/components/features/course/course-card";
import EmptyList from "@/components/features/course/empty-list";
import ExploreSkeleton from "@/components/features/course/explore-skeleton";
import { useCourseFilters } from "@/hooks/use-course-filters";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { CourseService } from "@/services/course.service";
import { CourseResponse } from "@/types/payload/response/course.response";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Fragment } from "react";

const PAGE_SIZE = 20;

const ExplorePage = () => {
  const { filters } = useCourseFilters();

  const {
    data: coursePages,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["courses", filters],
    queryFn: ({ pageParam }) =>
      CourseService.getAllCourses({
        ...filters,
        page: pageParam,
        size: PAGE_SIZE,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.has_next ? lastPage.data.page + 1 : undefined,
  });

  const courses: CourseResponse[] =
    coursePages?.pages.flatMap((page) => page.data.items) ?? [];

  const sentinelRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <div className="flex flex-col">
      <CategoryBadges />

      {isError || (!isLoading && courses.length === 0) ? (
        <EmptyList />
      ) : (
        <Fragment>
          <div className="grid gap-6 gap-y-6 my-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <ExploreSkeleton />
            ) : (
              courses.map((course: CourseResponse) => (
                <CourseCard key={course.id} course={course} />
              ))
            )}
          </div>

          <div ref={sentinelRef} aria-hidden className="h-1" />

          {isFetchingNextPage && (
            <div className="flex items-center justify-center gap-2 pb-8 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading more courses...</span>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default ExplorePage;
