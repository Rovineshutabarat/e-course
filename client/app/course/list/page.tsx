"use client";

import CourseCard from "@/components/features/course/course-card";
import EmptyList from "@/components/shared/empty-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowRight, SearchX } from "lucide-react";
import { Fragment, useState } from "react";

const dummyCategories = [
  { id: "1", name: "Design" },
  { id: "2", name: "Web Development" },
  { id: "3", name: "Data Science" },
  { id: "4", name: "Marketing" },
  { id: "5", name: "Business" },
  { id: "6", name: "Lifestyle" },
  { id: "7", name: "Photography" },
  { id: "8", name: "Music" },
  { id: "9", name: "Finance" },
  { id: "10", name: "Health" },
  { id: "11", name: "Language" },
  { id: "12", name: "Engineering" },
  { id: "13", name: "Engineering" },
  { id: "14", name: "Engineering" },
  { id: "15", name: "Engineering" },
  { id: "16", name: "Engineering" },
];

const dummyCourses = [
  {
    id: "1",
    title: "UI/UX Design Fundamentals",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum error earum molestias aperiam alias, ea reiciendis ratione sapiente cupiditate quaerat!f",
    image:
      "https://media.istockphoto.com/id/1354077790/photo/man-working-at-home.jpg?s=612x612&w=0&k=20&c=ePzpG0JgiHd4R85JyoyxIndl4vYQP6avw9nNJ6Zgg8w=",
    rating: 4.6,
    reviews: "980",
    difficulty: "Beginner",
    duration: "50 hours",
    modules: "120",
    price: "Rp.120.000",
    enrolled: "15,000",
    category: "design",
    instructor: {
      name: "Jessica Taylor",
      avatar:
        "https://media.istockphoto.com/id/1354077790/photo/man-working-at-home.jpg?s=612x612&w=0&k=20&c=ePzpG0JgiHd4R85JyoyxIndl4vYQP6avw9nNJ6Zgg8w=",
    },
  },
  {
    id: "2",
    title: "Advanced Figma Techniques",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum error earum molestias aperiam alias, ea reiciendis ratione sapiente cupiditate quaerat!f",
    image:
      "https://media.istockphoto.com/id/1354077790/photo/man-working-at-home.jpg?s=612x612&w=0&k=20&c=ePzpG0JgiHd4R85JyoyxIndl4vYQP6avw9nNJ6Zgg8w=",
    rating: 4.7,
    reviews: "850",
    difficulty: "Intermediate",
    duration: "45 hours",
    modules: "95",
    price: "Rp.150.000",
    enrolled: "12,000",
    category: "design",
    instructor: {
      name: "Daniel White",
      avatar:
        "https://media.istockphoto.com/id/1354077790/photo/man-working-at-home.jpg?s=612x612&w=0&k=20&c=ePzpG0JgiHd4R85JyoyxIndl4vYQP6avw9nNJ6Zgg8w=",
    },
  },
  {
    id: "3",
    title: "User Research & Testing Masterclass",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum error earum molestias aperiam alias, ea reiciendis ratione sapiente cupiditate quaerat!f",
    image:
      "https://media.istockphoto.com/id/1354077790/photo/man-working-at-home.jpg?s=612x612&w=0&k=20&c=ePzpG0JgiHd4R85JyoyxIndl4vYQP6avw9nNJ6Zgg8w=",
    rating: 4.8,
    reviews: "1.3K",
    difficulty: "Advanced",
    duration: "60 hours",
    modules: "150",
    price: "Rp.180.000",
    enrolled: "18,000",
    category: "web-development",
    instructor: {
      name: "Olivia Green",
      avatar:
        "https://media.istockphoto.com/id/1354077790/photo/man-working-at-home.jpg?s=612x612&w=0&k=20&c=ePzpG0JgiHd4R85JyoyxIndl4vYQP6avw9nNJ6Zgg8w=",
    },
  },
  {
    id: "4",
    title: "Mobile App UI Design for Beginners",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum error earum molestias aperiam alias, ea reiciendis ratione sapiente cupiditate quaerat!f",
    image:
      "https://media.istockphoto.com/id/1354077790/photo/man-working-at-home.jpg?s=612x612&w=0&k=20&c=ePzpG0JgiHd4R85JyoyxIndl4vYQP6avw9nNJ6Zgg8w=",
    rating: 4.5,
    reviews: "1.1K",
    difficulty: "Beginner",
    duration: "40 hours",
    modules: "85",
    price: "Rp.120.000",
    enrolled: "22,000",
    category: "design",
    instructor: {
      name: "Chris Johnson",
      avatar:
        "https://media.istockphoto.com/id/1354077790/photo/man-working-at-home.jpg?s=612x612&w=0&k=20&c=ePzpG0JgiHd4R85JyoyxIndl4vYQP6avw9nNJ6Zgg8w=",
    },
  },
  {
    id: "5",
    title: "React & Next.js Complete Bootcamp",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum error earum molestias aperiam alias, ea reiciendis ratione sapiente cupiditate quaerat!f",
    image:
      "https://media.istockphoto.com/id/1354077790/photo/man-working-at-home.jpg?s=612x612&w=0&k=20&c=ePzpG0JgiHd4R85JyoyxIndl4vYQP6avw9nNJ6Zgg8w=",
    rating: 4.9,
    reviews: "2.1K",
    difficulty: "Intermediate",
    duration: "80 hours",
    modules: "200",
    price: "Rp.250.000",
    enrolled: "30,000",
    category: "web-development",
    instructor: {
      name: "Ryan Adams",
      avatar:
        "https://media.istockphoto.com/id/1354077790/photo/man-working-at-home.jpg?s=612x612&w=0&k=20&c=ePzpG0JgiHd4R85JyoyxIndl4vYQP6avw9nNJ6Zgg8w=",
    },
  },
  {
    id: "6",
    title: "Python for Data Science",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum error earum molestias aperiam alias, ea reiciendis ratione sapiente cupiditate quaerat!f",
    image:
      "https://media.istockphoto.com/id/1354077790/photo/man-working-at-home.jpg?s=612x612&w=0&k=20&c=ePzpG0JgiHd4R85JyoyxIndl4vYQP6avw9nNJ6Zgg8w=",
    rating: 4.7,
    reviews: "1.8K",
    difficulty: "Beginner",
    duration: "55 hours",
    modules: "130",
    price: "Rp.200.000",
    enrolled: "25,000",
    category: "data-science",
    instructor: {
      name: "Sarah Lee",
      avatar:
        "https://media.istockphoto.com/id/1354077790/photo/man-working-at-home.jpg?s=612x612&w=0&k=20&c=ePzpG0JgiHd4R85JyoyxIndl4vYQP6avw9nNJ6Zgg8w=",
    },
  },
];

const CourseListPage = () => {
  const MAX_VISIBLE_CATEGORY = 15;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCourses = activeCategory
    ? dummyCourses.filter((c) => c.category === activeCategory)
    : dummyCourses;

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
          {dummyCategories.slice(0, MAX_VISIBLE_CATEGORY).map((category) => (
            <Badge
              key={category.id}
              variant={
                activeCategory === category.name.toLowerCase().replace(" ", "-")
                  ? "default"
                  : "secondary"
              }
              className="whitespace-nowrap cursor-pointer text-sm"
              onClick={() =>
                setActiveCategory(category.name.toLowerCase().replace(" ", "-"))
              }
            >
              {category.name}
            </Badge>
          ))}
          {dummyCategories.length > MAX_VISIBLE_CATEGORY && (
            <Badge variant="outline">
              +{dummyCategories.slice(MAX_VISIBLE_CATEGORY).length} More
            </Badge>
          )}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>

      {filteredCourses.length === 0 ? (
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
          <Fragment>
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </Fragment>
        </div>
      )}
    </div>
  );
};

export default CourseListPage;
