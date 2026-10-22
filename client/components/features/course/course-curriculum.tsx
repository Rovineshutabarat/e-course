"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CourseModule } from "@/types/entity/module";
import { Resource } from "@/types/entity/resource";
import { Check, Download, ListVideo, Lock, PlayCircle } from "lucide-react";

type CourseCurriculumProps = {
  modules: CourseModule[];
  currentResourceId: number | null;
  completedResourceIds?: number[];
  onSelectResource?: (resource: Resource) => void;
};

const CourseCurriculum = ({
  modules,
  currentResourceId,
  completedResourceIds = [],
  onSelectResource,
}: CourseCurriculumProps) => {
  const sortedModules = [...modules].sort(
    (a, b) => a.orderNumber - b.orderNumber,
  );
  const totalLessons = sortedModules.reduce(
    (acc, m) => acc + m.resources.length,
    0,
  );
  const completedCount = completedResourceIds.length;
  const progress =
    totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Course Content</CardTitle>
        <div className="flex items-center justify-between">
          <CardDescription>
            {sortedModules.length} modules &bull; {totalLessons} lessons
          </CardDescription>
          <div className="text-sm">
            <span className="font-medium">
              {completedCount > 0 ? `${progress}%` : "Not started"}
            </span>
          </div>
        </div>
        {totalLessons > 0 && <Progress value={progress} className="mt-2" />}
      </CardHeader>

      <CardContent className="max-h-[calc(100vh-200px)] overflow-y-auto">
        {sortedModules.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <ListVideo className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-medium">No lessons yet</p>
            <p className="text-xs text-muted-foreground">
              Lessons will appear here once the instructor publishes them.
            </p>
          </div>
        ) : (
          <Accordion
            type="multiple"
            defaultValue={
              sortedModules.length > 0 ? [String(sortedModules[0].id)] : []
            }
            className="w-full"
          >
            {sortedModules.map((module) => (
              <AccordionItem
                key={module.id}
                value={module.id.toString()}
                className="border-b"
              >
                <AccordionTrigger className="hover:no-underline py-3">
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium">{module.title}</span>
                    <div className="text-xs text-muted-foreground mt-1">
                      {module.resources.length} lessons
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="space-y-1 py-1">
                    {[...module.resources]
                      .sort((a, b) => a.orderNumber - b.orderNumber)
                      .map((resource) => {
                        const isCurrent = currentResourceId === resource.id;
                        const isCompleted = completedResourceIds.includes(
                          resource.id,
                        );
                        const isLocked = resource.isAvailable === false;

                        return (
                          <button
                            key={resource.id}
                            type="button"
                            disabled={isLocked}
                            aria-current={isCurrent}
                            aria-label={`${resource.title}${isCurrent ? " (currently playing)" : ""}${isLocked ? " (locked)" : ""}`}
                            className={cn(
                              "flex min-h-[44px] w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors outline-none hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                              isCurrent && "bg-muted font-medium",
                            )}
                            onClick={() => onSelectResource?.(resource)}
                          >
                            {isCompleted ? (
                              <span className="grid size-4 shrink-0 place-items-center rounded-full bg-emerald-600 text-white">
                                <Check className="size-3" />
                              </span>
                            ) : isLocked ? (
                              <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
                            ) : (
                              <PlayCircle
                                className={cn(
                                  "h-4 w-4 shrink-0",
                                  isCurrent
                                    ? "text-primary"
                                    : "text-muted-foreground",
                                )}
                              />
                            )}
                            <span className="flex-1 truncate">
                              {resource.title}
                            </span>
                          </button>
                        );
                      })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>

      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full">
          <Download className="h-4 w-4 mr-1" />
          Download resources
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCurriculum;
