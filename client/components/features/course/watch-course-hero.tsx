"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { resolvePath } from "@/lib/path-resolver";
import type { CourseDetailResponse } from "@/types/payload/response/course.detail.response";

type WatchCourseHeroProps = {
  course: CourseDetailResponse;
};

const WatchCourseHero = ({ course }: WatchCourseHeroProps) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <Badge variant="secondary" className="font-medium">
          {course.category}
        </Badge>
        <Badge variant="outline" className="font-medium capitalize">
          {course.difficulty}
        </Badge>
      </div>
      <h1 className="text-xl font-bold leading-snug tracking-tight md:text-2xl">
        {course.title}
      </h1>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Avatar className="h-6 w-6">
          <AvatarImage
            src={resolvePath(course.instructor.image?.path) || "/placeholder.svg"}
            alt={course.instructor.username}
          />
          <AvatarFallback>{course.instructor.username.charAt(0)}</AvatarFallback>
        </Avatar>
        <span>{course.instructor.username}</span>
      </div>
    </div>
  );
};

export default WatchCourseHero;
