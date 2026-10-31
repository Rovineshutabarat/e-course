"use client";

import CourseDetailNavbar from "@/components/features/course/course-navbar";
import CoursePageSkeleton from "@/components/features/course/course-page-skeleton";
import WatchCourseHero from "@/components/features/course/watch-course-hero";
import CourseCurriculum from "@/components/features/course/course-curriculum";
import WatchError from "@/components/features/course/watch-error";
import WatchTabs from "@/components/features/course/watch-tabs";
import WatchPlayer from "@/components/features/course/watch-player";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CourseService } from "@/services/course.service";
import { ResourceService } from "@/services/resource.service";
import { useQuery } from "@tanstack/react-query";
import { ListVideo } from "lucide-react";
import { useParams } from "next/navigation";
import { Fragment, useState } from "react";

const WatchPage = () => {
  const params = useParams();
  const slug: string = params.slug as string;
  const [selectedResourceId, setSelectedResourceId] = useState<number | null>(
    null,
  );

  const { data: course } = useQuery({
    queryKey: [`course_${slug}`],
    queryFn: () => CourseService.getCourseBySlug(slug!),
  });

  const {
    data: modules,
    isLoading: isModulesLoading,
    isError: isModulesError,
    refetch: refetchModules,
  } = useQuery({
    queryKey: [`course_${slug}_modules`],
    queryFn: () => CourseService.getAllModuleBySlug(slug),
  });

  const {
    data: resource,
    isLoading: isResourceLoading,
    isError: isResourceError,
    refetch: refetchResource,
  } = useQuery({
    queryKey: [`course_${slug}_resource_${selectedResourceId}`],
    queryFn: () => ResourceService.getResourceById(selectedResourceId!),
    enabled: selectedResourceId !== null,
  });

  const courseModules = modules?.data ?? [];
  const resources = courseModules.flatMap((module) => module.resources);
  const resourceIds = resources.map((item) => item.id);

  const activeResource =
    selectedResourceId !== null && resourceIds.includes(selectedResourceId)
      ? selectedResourceId
      : (resourceIds[0] ?? null);

  if (isModulesLoading || isResourceLoading) {
    return <CoursePageSkeleton />;
  }

  if (isModulesError) {
    return (
      <Fragment>
        <CourseDetailNavbar title={course?.data.title} />
        <WatchError onRetry={() => refetchModules()} />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <CourseDetailNavbar title={course?.data.title} />

      <main className="mx-auto w-full max-w-10/12 px-4 py-6 md:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
          <div className="min-w-0">
            <div className="space-y-6">
              <section className="space-y-4">
                <WatchPlayer
                  resource={resource?.data}
                  totalResources={resources.length}
                  isError={isResourceError}
                  onRetry={() => refetchResource()}
                />

                {course && <WatchCourseHero course={course.data} />}

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full lg:hidden">
                      <ListVideo className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="flex w-[90vw] flex-col gap-0 sm:max-w-md"
                  >
                    <SheetHeader className="pb-3 text-left">
                      <SheetTitle>Course content</SheetTitle>
                      <SheetDescription>
                        {courseModules.length} modules {resources.length} lessons
                      </SheetDescription>
                    </SheetHeader>
                    <div className="-mx-1 flex-1 overflow-y-auto px-1 pb-4">
                      <CourseCurriculum
                        modules={courseModules}
                        currentResourceId={activeResource}
                        onSelectResource={(item) => setSelectedResourceId(item.id)}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </section>

              <WatchTabs />
            </div>
          </div>

          <aside className="hidden lg:block lg:w-85 lg:shrink-0">
            <div className="lg:sticky lg:top-20">
              <CourseCurriculum
                modules={courseModules}
                currentResourceId={activeResource}
                onSelectResource={(item) => setSelectedResourceId(item.id)}
              />
            </div>
          </aside>
        </div>
      </main>
    </Fragment>
  );
};

export default WatchPage;
