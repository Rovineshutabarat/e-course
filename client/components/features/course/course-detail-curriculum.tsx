"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { CourseService } from "@/services/course.service";
import { useQuery } from "@tanstack/react-query";
import { Lock, PlayCircle } from "lucide-react";

type CourseDetailCurriculumProps = {
  slug: string;
};

const CourseDetailCurriculum = ({ slug }: CourseDetailCurriculumProps) => {
  const { data: modules = [], isLoading, isError } = useQuery({
    queryKey: [`course_${slug}_modules`],
    queryFn: () => CourseService.getAllModuleBySlug(slug),
    select: (response) => response.data,
  });

  const resources = modules.flatMap((module) => module.resources);
  const totalModules: number = modules.length;
  const totalResources: number = resources.length;

  const freePreviews: number = resources.filter(
    (resource) => resource.is_available,
  ).length;

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">Curriculum preview</h2>
        <p className="text-sm text-muted-foreground">Take a look inside before you enroll. Preview lessons are free to watch.</p>
      </div>

      {isLoading ? (
        <div className="space-y-3 rounded-md bg-card p-5 shadow">
          <Skeleton className="h-4 w-48" />
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-md shadow bg-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4">
            <p className="text-sm text-muted-foreground">
              {totalModules} modules · {totalResources} lessons
            </p>
            {freePreviews > 0 && (
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                {freePreviews} free lesson{freePreviews > 1 ? "s" : ""}
              </span>
            )}
          </div>

          {isError ? (
            <p className="px-5 py-6 text-sm text-muted-foreground">Failed to load the curriculum. Please try again later.</p>
          ) : modules.length === 0 ? (
            <p className="px-5 py-6 text-sm text-muted-foreground">No curriculum available yet.</p>
          ) : (
            <Accordion
              type="multiple"
              defaultValue={[modules[0].id.toString()]}
              className="divide-y"
            >
              {modules.map((module) => (
                <AccordionItem
                  key={module.id}
                  value={module.id.toString()}
                  className="border-b-0 px-5"
                >
                  <AccordionTrigger className="gap-3 py-3.5 text-left hover:no-underline">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">
                        {module.title}
                      </span>
                      <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                        {module.resources.length} lessons
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3">
                    <ul className="-mx-1 space-y-0.5">
                      {module.resources.map((resource) => {
                        const isPreview = Boolean(resource.is_available);

                        return (
                          <li
                            key={resource.id}
                            className="flex min-h-11 items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-muted/60"
                          >
                            {isPreview ? (
                              <PlayCircle className="h-4 w-4 shrink-0 text-primary" />
                            ) : (
                              <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
                            )}
                            <span className="min-w-0 flex-1 truncate text-sm text-foreground/90">
                              {resource.title}
                            </span>
                            {isPreview && (
                              <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                Preview
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      )}
    </section>
  );
};

export default CourseDetailCurriculum;
