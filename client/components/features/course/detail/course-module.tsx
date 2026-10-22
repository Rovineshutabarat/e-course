"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CourseService } from "@/services/course.service";
import { CourseModule as CourseModuleType } from "@/types/entity/module";
import { useQuery } from "@tanstack/react-query";
import { Lock, PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";

type CourseModuleProps = {
  slug: string;
};

const CourseModulePreview = ({ slug }: CourseModuleProps) => {
  const { data: modulesResponse, isLoading, isError } = useQuery({
    queryKey: [`course_${slug}_modules`],
    queryFn: () => CourseService.getCourseModules(slug),
  });

  const modules: CourseModuleType[] = modulesResponse?.data ?? [];
  const totalLessons = modules.reduce(
    (acc, module) => acc + module.resources.length,
    0,
  );

  const [openValues, setOpenValues] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized && modules.length > 0) {
      setOpenValues([`section-${modules[0].id}`]);
      setInitialized(true);
    }
  }, [initialized, modules]);

  const allValues = modules.map((module) => `section-${module.id}`);
  const allExpanded =
    modules.length > 0 && openValues.length === modules.length;

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">
          Curriculum preview
        </h2>
        <p className="text-sm text-muted-foreground">
          Take a look inside before you enroll. Preview lessons are free to
          watch.
        </p>
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
          <div className="flex flex-wrap items-start justify-between gap-3 border-b px-5 py-4">
            <p className="text-sm text-muted-foreground">
              {modules.length} sections &bull; {totalLessons} lessons
            </p>
            {modules.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 shrink-0 px-3 text-sm font-medium"
                onClick={() => setOpenValues(allExpanded ? [] : allValues)}
              >
                {allExpanded ? "Collapse all" : "Expand all"}
              </Button>
            )}
          </div>

          {isError ? (
            <p className="px-5 py-6 text-sm text-muted-foreground">
              Failed to load the curriculum. Please try again later.
            </p>
          ) : modules.length === 0 ? (
            <p className="px-5 py-6 text-sm text-muted-foreground">
              No curriculum available yet.
            </p>
          ) : (
            <Accordion
              type="multiple"
              value={openValues}
              onValueChange={setOpenValues}
              className="divide-y"
            >
              {modules.map((module) => (
                <AccordionItem
                  key={module.id}
                  value={`section-${module.id}`}
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
                  <AccordionContent className="pb-2">
                    <ul className="-mx-1 space-y-0.5">
                      {module.resources.map((resource) => {
                        const isLocked = resource.isAvailable === false;

                        return (
                          <li
                            key={resource.id}
                            className="flex min-h-[44px] items-center gap-3 rounded-lg px-2 py-2"
                          >
                            {isLocked ? (
                              <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
                            ) : (
                              <PlayCircle className="h-4 w-4 shrink-0 text-muted-foreground" />
                            )}
                            <span className="min-w-0 flex-1 truncate text-sm text-foreground/90">
                              {resource.title}
                            </span>
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

export default CourseModulePreview;
