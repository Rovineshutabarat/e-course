"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatPrice } from "@/lib/price.formatter";
import { Course } from "@/types/entity/course";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DifficultyBadge from "./difficulty-badge";

type CourseCardProps = {
  course: Course;
};

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link href={course.slug ?? ""}
      className="group w-[20rem] shrink-0 cursor-pointer flex flex-col"
      key={course.id}
    >

      <div className="overflow-hidden rounded-xl mb-4 relative">
        <div className="relative w-full h-48">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${course.image.path}`}
            alt={course.image.name || "Course image"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <DifficultyBadge difficulty={course.difficulty} />
      </div>

      <div className="flex flex-col space-y-1 items-start">
        <h3 className="mb-2 text-lg font-semibold group-hover:text-blue-500 transition-colors line-clamp-2">
          {course.title}
        </h3>

        {course.description && (
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3 pr-2">
            {course.description}
          </p>
        )}
      </div>

      <div className="flex items-center text-sm text-muted-foreground mb-2">
        <Avatar className="w-5 h-5 mr-1.5 border">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${course.instructor.image?.path}`}
            alt={course.instructor.image?.name || "avatar"}
            fill
            className="rounded-full object-cover border"
          />
          <AvatarFallback className="text-xs">
            {course.instructor.username?.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <span>By {course.instructor.username}</span>
        <span className="mx-2">•</span>

        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 mr-1" />
        <p>4.5 (120)</p>
      </div>

      <div className="text-lg font-bold text-foreground mt-auto">
        {formatPrice(course.price)}
      </div>
    </Link>
  );
};

export default CourseCard;
