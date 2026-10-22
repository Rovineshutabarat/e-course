"use client";

import CourseCard from "@/components/features/course/course-card";
import CourseCardSkeleton from "@/components/features/course/course-card-skeleton";
import CourseListEmpty from "@/components/features/course/course-list-empty";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useCourseFilters } from "@/hooks/use-course-filters";
import { CategoryService } from "@/services/category.service";
import { CourseService } from "@/services/course.service";
import { Category } from "@/types/entity/category";
import { CourseResponse } from "@/types/payload/response/course.response";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Fragment, useEffect, useRef } from "react";


const CourseListPage = () => {
  const PAGE_SIZE = 20;
  const MAX_VISIBLE_CATEGORY = 20;
  const { filters, setFilters } = useCourseFilters();
  const sentinelRef = useRef<HTMLDivElement>(null);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoryService.getAllCategories(),
  });

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
      CourseService.getCourses({
        ...filters,
        page: pageParam,
        size: PAGE_SIZE,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.page + 1 : undefined,
  });

  const courses: CourseResponse[] =
    coursePages?.pages.flatMap((page) => page.data.items) ?? [];

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="flex flex-col">
      {(categories?.data?.length ?? 0) > 0 && (
        <ScrollArea>
          <div className="flex items-center gap-2">
            <Badge
              variant={filters.categoryId === undefined ? "default" : "secondary"}
              className="whitespace-nowrap cursor-pointer rounded-md px-4 py-1.5 text-sm font-medium"
              onClick={() => setFilters({ categoryId: undefined })}
            >
              All
            </Badge>
            {categories?.data
              .slice(0, MAX_VISIBLE_CATEGORY)
              .map((category: Category) => (
                <Badge
                  key={category.id}
                  variant={
                    filters.categoryId === category.id ? "default" : "secondary"
                  }
                  className="whitespace-nowrap cursor-pointer rounded-md px-4 py-1.5 text-sm font-medium"
                  onClick={() => setFilters({ categoryId: category.id! })}
                >
                  {category.name}
                </Badge>
              ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      )}

      {isError ? (
        <CourseListEmpty />
      ) : !isLoading && courses.length === 0 ? (
        <CourseListEmpty />
      ) : (
        <Fragment>
          <div className="grid gap-6 gap-y-6 my-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <CourseCardSkeleton />
            ) : (
              <Fragment>
                {courses.map((course: CourseResponse) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </Fragment>
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

export default CourseListPage;
