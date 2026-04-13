"use client";

import CourseCard from "@/components/features/course/course-card";
import CourseCardSkeleton from "@/components/features/course/course-card-skeleton";
import EmptyList from "@/components/shared/empty-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CategoryService } from "@/services/category.service";
import { CourseService } from "@/services/course.service";
import { Category } from "@/types/entity/category";
import { Course } from "@/types/entity/course";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, SearchX } from "lucide-react";
import { Fragment, useState } from "react";

const CourseListPage = () => {
  const MAX_VISIBLE_CATEGORY = 20;
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoryService.getAllCategories()
  })

  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => CourseService.getAllCourses()
  })


  console.log("jhvhv");
  return (

    <div className="flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">Popular Courses</h2>
        <p className="text-sm text-muted-foreground">
          Discover our top-rated courses for your learning journey.
        </p>
      </div>

      <ScrollArea>
        <div className="flex items-center gap-2">
          <Badge
            variant={activeCategory === null ? "default" : "secondary"}
            className="whitespace-nowrap cursor-pointer"
            onClick={() => setActiveCategory(null)}
          >
            All
          </Badge>
          {categories?.data.slice(0, MAX_VISIBLE_CATEGORY).map((category: Category) => (
            <Badge
              key={category.id}
              variant={
                activeCategory === category.id
                  ? "default"
                  : "secondary"
              }
              className="whitespace-nowrap cursor-pointer text-sm"
              onClick={() =>
                setActiveCategory(category.id!)
              }
            >
              {category.name}
            </Badge>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>

      {courses?.data.length === 0 ? (
        <EmptyList
          title="No Courses Found"
          description="We couldn't find any courses that match your search. Try adjusting your filters or browse all courses instead."
          icon={<SearchX className="h-24 w-24 mb-6" />}
        >
          <Button
            className="cursor-pointer"
            onClick={() => setActiveCategory(null)}
          >
            <span>Browse All Courses</span>
            <ArrowRight />
          </Button>
        </EmptyList>
      ) : (
        <div className="grid gap-4 gap-y-6 my-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading ? <CourseCardSkeleton /> :
            <Fragment>
              {courses?.data.map((course: Course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </Fragment>}
        </div>
      )}
    </div>
  );
};

export default CourseListPage;
