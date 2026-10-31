import { Badge } from "@/components/ui/badge";
import { resolvePath } from "@/lib/path-resolver";
import type { CourseDetailResponse } from "@/types/payload/response/course.detail.response";
import { Award, BookOpen, Check, Clock, Globe, PlayCircle, Star, Users } from "lucide-react";
import Image from "next/image";

type CourseDetailHeroProps = {
  course: CourseDetailResponse;
};

const CourseDetailHero = ({ course }: CourseDetailHeroProps) => {
  return (
    <div className="space-y-8">
      <div className="space-y-5">
        <div className="relative h-56 w-full overflow-hidden rounded-xl border bg-muted sm:h-72 lg:h-96">
          <Image src={resolvePath(course.image?.path) || "/placeholder.svg"} alt={course.title} fill priority className="object-cover" />
        </div>
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Badge variant="secondary" className="font-medium">{course.category}</Badge>
            <Badge variant="outline" className="font-medium capitalize">{course.difficulty}</Badge>
          </div>
          <h1 className="max-w-xl text-2xl font-bold leading-snug tracking-tight md:text-3xl md:leading-tight">{course.title}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-1.5 font-semibold">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />4.8
              <span className="font-normal text-muted-foreground">(120 reviews)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground"><Users className="h-4 w-4" />3,214 students</span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground"><Clock className="h-4 w-4" />20 hours on-demand video</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="gap-1.5 font-normal"><BookOpen className="h-3.5 w-3.5" />12 sections</Badge>
            <Badge variant="secondary" className="gap-1.5 font-normal"><PlayCircle className="h-3.5 w-3.5" />48 lessons</Badge>
            <Badge variant="secondary" className="gap-1.5 font-normal"><Globe className="h-3.5 w-3.5" />English</Badge>
            <Badge variant="secondary" className="gap-1.5 font-normal"><Award className="h-3.5 w-3.5" />Certificate of completion</Badge>
          </div>
        </div>
      </div>
      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">About this course</h2>
        <p className="text-sm leading-7 text-foreground/80">{course.description}</p>
      </section>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">What you'll learn</h2>
          {course.outcomes.length === 0 && <p className="text-sm text-muted-foreground">No items yet.</p>}
          <ul className="space-y-2.5">
            {course.outcomes.map((outcome) => {
              return (
                <li key={outcome.id} className="flex items-start gap-2.5">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="text-sm leading-6 text-foreground/80">{outcome.name}</span>
                </li>
              )
            })}
          </ul>
        </section>
        <section className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">Requirements</h2>
          {course.requirements.length === 0 && <p className="text-sm text-muted-foreground">No items yet.</p>}
          <ul className="space-y-2.5">
            {course.requirements.map((requirement) => {
              return (
                <li key={requirement.id} className="flex items-start gap-2.5">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="text-sm leading-6 text-foreground/80">{requirement.name}</span>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CourseDetailHero;
