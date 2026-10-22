"use client";

import MuxPlayer from "@mux/mux-player-react";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  ListVideo,
  MessagesSquare,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import { Fragment, useState } from "react";

import AiQuizPanel from "@/components/features/course/ai-quiz-panel";
import AiSummaryPanel from "@/components/features/course/ai-summary-panel";
import CourseCurriculum from "@/components/features/course/course-curriculum";
import CourseDiscussion from "@/components/features/course/course-discussion";
import CourseDetailNavbar from "@/components/features/course/detail/course-detail-navbar";
import CourseDetailPageSkeleton from "@/components/features/course/detail/course-detail-page-skeleton";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseService } from "@/services/course.service";
import { CourseModule } from "@/types/entity/module";
import { Resource } from "@/types/entity/resource";

function resolveMediaSrc(url: string | undefined): string | null {
  if (!url) return null;
  if (/^https?:\/\//.test(url)) return url;
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (!base) return url;
  return `${base}/${url.replace(/^\//, "")}`;
}

const CourseResourcePage = () => {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("discussions");

  const slug = params.slug as string;
  const resourceId = Number(params.id);

  const {
    data: course,
    isLoading: isCourseLoading,
    isError,
  } = useQuery({
    queryKey: [`course_${slug}`],
    queryFn: () => CourseService.getCourseBySlug(slug!),
  });

  const { data: modulesResponse, isLoading: areModulesLoading } = useQuery({
    queryKey: [`course_${slug}_modules`],
    queryFn: () => CourseService.getCourseModules(slug!),
  });

  if (isError) notFound();

  if (isCourseLoading || areModulesLoading) {
    return (
      <Fragment>
        <CourseDetailPageSkeleton />
      </Fragment>
    );
  }

  const modules: CourseModule[] = [...(modulesResponse?.data ?? [])].sort(
    (a, b) => a.orderNumber - b.orderNumber,
  );

  const flatLessons: { module: CourseModule; resource: Resource }[] =
    modules.flatMap((module) =>
      [...module.resources]
        .sort((a, b) => a.orderNumber - b.orderNumber)
        .map((resource) => ({ module, resource })),
    );

  const currentIndex = flatLessons.findIndex(
    (lesson) => lesson.resource.id === resourceId,
  );
  const currentLesson =
    currentIndex >= 0 ? flatLessons[currentIndex] : (flatLessons[0] ?? null);
  const currentModule = currentLesson?.module ?? null;
  const currentResource = currentLesson?.resource ?? null;
  const prevLesson = currentIndex > 0 ? flatLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex >= 0 && currentIndex < flatLessons.length - 1
      ? flatLessons[currentIndex + 1]
      : null;

  const goToLesson = (id: number) =>
    router.push(`/course/${slug}/resource/${id}`);

  const wallpaperPath =
    (
      course?.data as unknown as {
        wallpaper?: { path?: string; name?: string };
      }
    )?.wallpaper?.path ?? course?.data.image?.path;
  const wallpaperSrc = wallpaperPath
    ? `${process.env.NEXT_PUBLIC_API_URL}/${wallpaperPath}`
    : "/placeholder.svg";
  const mediaSrc = resolveMediaSrc(currentResource?.url);
  const lessonTitle = currentResource?.title ?? course?.data.title ?? "";

  const curriculum = (
    <CourseCurriculum
      modules={modules}
      currentResourceId={currentResource?.id ?? null}
      onSelectResource={(resource) => goToLesson(resource.id)}
    />
  );

  return (
    <Fragment>
      <div className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <CourseDetailNavbar title={course?.data.title} />
      </div>

      <main className="mx-auto w-full max-w-10/12 px-4 py-6 md:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
          <div className="min-w-0">
            <div className="space-y-6">
              {/* Player */}
              <section className="space-y-4">
                <div className="overflow-hidden rounded-xl border bg-black">
                  {mediaSrc && currentResource ? (
                    <MuxPlayer
                      key={mediaSrc}
                      streamType="on-demand"
                      src={mediaSrc}
                      poster={wallpaperSrc}
                      title={currentResource.title}
                      style={{ aspectRatio: "16 / 9", width: "100%" }}
                    />
                  ) : (
                    <div className="relative aspect-video w-full">
                      <Image
                        src={wallpaperSrc}
                        alt={course?.data.title || "Course cover"}
                        fill
                        priority
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/55 p-6 text-center">
                        <PlayCircle className="h-10 w-10 text-white/80" />
                        <p className="font-semibold text-white">
                          Video isn&apos;t available yet
                        </p>
                        <p className="max-w-md text-sm text-white/70">
                          {modules.length === 0
                            ? "Lessons will appear here once the instructor publishes them."
                            : "This lesson has no playable video attached."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  {currentModule && (
                    <p className="text-[13px] font-medium text-muted-foreground">
                      {currentModule.title}
                    </p>
                  )}
                  <h1 className="text-2xl font-bold tracking-tight md:text-[28px] md:leading-[1.25]">
                    {lessonTitle}
                  </h1>
                  {currentIndex >= 0 && (
                    <p className="text-[13px] tabular-nums text-muted-foreground">
                      Lesson {currentIndex + 1} of {flatLessons.length}
                    </p>
                  )}
                </div>

                {/* Prev / Next */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    disabled={!prevLesson}
                    onClick={() =>
                      prevLesson && goToLesson(prevLesson.resource.id)
                    }
                    className="h-auto min-h-11 justify-start gap-2 px-3 py-2"
                  >
                    <ChevronLeft className="h-4 w-4 shrink-0" />
                    <span className="min-w-0 text-left">
                      <span className="block text-[11px] font-normal text-muted-foreground">
                        Previous
                      </span>
                      <span className="block truncate text-sm font-medium">
                        {prevLesson?.resource.title ?? "—"}
                      </span>
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    disabled={!nextLesson}
                    onClick={() =>
                      nextLesson && goToLesson(nextLesson.resource.id)
                    }
                    className="h-auto min-h-11 justify-end gap-2 px-3 py-2"
                  >
                    <span className="min-w-0 text-right">
                      <span className="block text-[11px] font-normal text-muted-foreground">
                        Up next
                      </span>
                      <span className="block truncate text-sm font-medium">
                        {nextLesson?.resource.title ?? "—"}
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0" />
                  </Button>
                </div>

                {/* Mobile curriculum drawer */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full lg:hidden">
                      <ListVideo className="h-4 w-4" />
                      Course content &bull; {flatLessons.length} lessons
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="flex w-[90vw] flex-col gap-0 sm:max-w-md"
                  >
                    <SheetHeader className="pb-3 text-left">
                      <SheetTitle>Course content</SheetTitle>
                      <SheetDescription>
                        {modules.length} modules &bull; {flatLessons.length}{" "}
                        lessons
                      </SheetDescription>
                    </SheetHeader>
                    <div className="-mx-1 flex-1 overflow-y-auto px-1 pb-4">
                      {curriculum}
                    </div>
                  </SheetContent>
                </Sheet>
              </section>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full max-w-full justify-start overflow-x-auto bg-card">
                  <TabsTrigger value="discussions" className="shrink-0 gap-1.5">
                    <MessagesSquare className="h-3.5 w-3.5" />
                    Discussion
                  </TabsTrigger>
                  <TabsTrigger value="quiz" className="shrink-0 gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    AI Quiz
                  </TabsTrigger>
                  <TabsTrigger value="summary" className="shrink-0 gap-1.5">
                    <FileText className="h-3.5 w-3.5" />
                    AI Summary
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="discussions">
                  <CourseDiscussion />
                </TabsContent>

                <TabsContent value="quiz">
                  <AiQuizPanel lessonTitle={lessonTitle} />
                </TabsContent>

                <TabsContent value="summary">
                  <AiSummaryPanel lessonTitle={lessonTitle} />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <aside className="hidden lg:block lg:w-[340px] lg:shrink-0">
            <div className="lg:sticky lg:top-20">{curriculum}</div>
          </aside>
        </div>
      </main>
    </Fragment>
  );
};

export default CourseResourcePage;
