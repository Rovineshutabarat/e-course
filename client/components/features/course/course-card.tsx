"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import DifficultyBadge from "./difficulty-badge";

type CourseCardProps = {
  course: any;
};

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <div
      className="group w-[20rem] shrink-0 cursor-pointer flex flex-col"
      key={course.title}
    >
      <div className="overflow-hidden rounded-xl mb-4 relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <DifficultyBadge difficulty={course.difficulty} />
      </div>

      <div className="flex flex-col space-y-1 items-start">
        <h3 className="mb-2 text-lg font-semibold group-hover:text-blue-500 transition-colors line-clamp-2">
          {course.title}
        </h3>

        {course.description && (
          <p className="text-muted-foreground text-sm line-clamp-1 mb-3">
            {course.description}
          </p>
        )}
      </div>

      <div className="flex items-center text-sm text-muted-foreground mb-2">
        <Avatar className="w-5 h-5 mr-1.5 border">
          <AvatarImage
            src={course.instructor.avatar}
            alt={course.instructor.name}
          />
          <AvatarFallback className="text-xs">
            {course.instructor.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <span>By {course.instructor.name}</span>
        <span className="mx-2">•</span>

        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 mr-1" />
        <p>{course.rating} (120)</p>
      </div>

      <div className="text-lg font-bold text-foreground mt-auto">
        {course.price}
      </div>
    </div>
  );
};

export default CourseCard;
