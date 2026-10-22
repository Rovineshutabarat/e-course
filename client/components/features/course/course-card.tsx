"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { resolvePath } from "@/lib/path-resolver";
import { formatPrice } from "@/lib/price.formatter";
import { CourseResponse } from "@/types/payload/response/course.response";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type CourseCardProps = {
  course: CourseResponse;
};

const FALLBACK_IMAGE = "/dummy.png";


const CourseCard = ({ course }: CourseCardProps) => {
  const dummyRating = ((43 + ((course.id ?? 1) * 7) % 7) / 10).toFixed(1);
  const dummyReviews = 40 + ((course.id ?? 1) * 37) % 300;


  return (
    <Link href={`/course/${course.slug ?? ""}`}
      className="group w-full min-w-0 cursor-pointer flex flex-col"
      key={course.id}
    >

      <div className="overflow-hidden rounded-lg relative">
        <div className="relative w-full aspect-video">
          <Image
            src={resolvePath(course.image?.path) ?? FALLBACK_IMAGE}
            alt={course.image?.name || "Course image"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-3 mr-1.5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
            {course.category}
          </p>
          <p className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
            <span className="relative inline-flex">
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 text-border" fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              <span
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${(Number(dummyRating) / 5) * 100}%` }}
              >
                <span className="flex w-max gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </span>
              </span>
            </span>
            <span className="font-medium text-foreground">{dummyRating}</span>
            <span>({dummyReviews})</span>
          </p>
        </div>

        <h3 className="mb-1 text-[15px] font-semibold leading-snug line-clamp-2">
          {course.title}
        </h3>

        {course.description && (
          <p className="text-muted-foreground text-[13px] leading-relaxed line-clamp-2">
            {course.description}
          </p>
        )}

        <div className="flex items-center justify-between gap-2 my-3">
          <div className="flex min-w-0 items-center text-[13px] text-muted-foreground">
            <Avatar className="w-8 h-8 mr-1.5 border">
              <AvatarImage
                src={resolvePath(course.instructor?.image?.path) || undefined}
                alt={course.instructor.username}
                className="object-cover"
              />
              <AvatarFallback className="">
                {course.instructor.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <span>By {course.instructor.username}</span>
          </div>

          <span className={`shrink-0 font-extrabold ${course.price === 0 ? "text-emerald-600" : "text-foreground"}`}>
            {course.price === 0 ? "Free" : formatPrice(course.price)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
