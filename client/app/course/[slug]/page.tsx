"use client";

import {
  Award,
  BookOpen,
  Check,
  Clock,
  Globe,
  PlayCircle,
  Star,
  Users,
} from "lucide-react";

import CourseCheckoutSidebar from "@/components/features/course/course-checkout-sidebar";
import CourseContent from "@/components/features/course/course-content";
import CourseDetailNavbar from "@/components/features/course/course-detail-navbar";
import CourseDetailPageSkeleton from "@/components/features/course/course-detail-page-skeleton";
import CourseReview from "@/components/features/course/course-review";
import Footer from "@/components/features/main/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CourseService } from "@/services/course.service";
import { Faq } from "@/types/entity/faq";
import { Outcome } from "@/types/entity/outcome";
import { Requirement } from "@/types/entity/requirement";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { Fragment } from "react";

const CourseDetailPage = () => {
  const params = useParams();

  const slug: string = params.slug as string;

  const { data: course, isLoading, isError } = useQuery({
    queryKey: [`course_${slug}`],
    queryFn: () => CourseService.getCourseBySlug(slug!),
  });

  if (isError) notFound();

  const wallpaperPath =
    (course?.data as unknown as { wallpaper?: { path?: string; name?: string } })
      ?.wallpaper?.path ?? course?.data.image?.path;
  const wallpaperSrc = wallpaperPath
    ? `${process.env.NEXT_PUBLIC_API_URL}/${wallpaperPath}`
    : "/placeholder.svg";
  const instructorAvatar = course?.data.instructor.image?.path
    ? `${process.env.NEXT_PUBLIC_API_URL}/${course.data.instructor.image.path}`
    : "";

  return (
    <Fragment>
      {isLoading ? <CourseDetailPageSkeleton /> :
        <Fragment>
          <div className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <CourseDetailNavbar />
          </div>

          <main className="mx-auto w-full max-w-10/12 px-4 py-6 md:px-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
              <div className="min-w-0">
                <div className="space-y-8">
                  {/* Hero */}
                  <div className="space-y-5">
                    <div className="relative h-[220px] w-full overflow-hidden rounded-xl border bg-muted sm:h-[300px] lg:h-[360px]">
                      <Image
                        src={wallpaperSrc}
                        alt={course?.data.title || "Course cover"}
                        fill
                        priority
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2 text-[13px]">
                        <Badge variant="secondary" className="font-medium">
                          {course?.data.category}
                        </Badge>
                        <Badge variant="outline" className="font-medium capitalize">
                          {course?.data.difficulty}
                        </Badge>
                        <span className="text-muted-foreground">
                          Last updated 11/2024
                        </span>
                      </div>

                      <h1 className="max-w-[32ch] text-2xl font-bold leading-snug tracking-tight md:text-[28px] md:leading-[1.25]">
                        {course?.data.title}
                      </h1>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                        <span className="inline-flex items-center gap-1.5 font-semibold">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          4.8
                          <span className="font-normal text-muted-foreground">
                            (120 reviews)
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          3,214 students
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          20 hours on-demand video
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="gap-1.5 font-normal">
                          <BookOpen className="h-3.5 w-3.5" />
                          12 sections
                        </Badge>
                        <Badge variant="secondary" className="gap-1.5 font-normal">
                          <PlayCircle className="h-3.5 w-3.5" />
                          48 lessons
                        </Badge>
                        <Badge variant="secondary" className="gap-1.5 font-normal">
                          <Globe className="h-3.5 w-3.5" />
                          English
                        </Badge>
                        <Badge variant="secondary" className="gap-1.5 font-normal">
                          <Award className="h-3.5 w-3.5" />
                          Certificate of completion
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Description */}
                  <section className="space-y-3">
                    <h2 className="text-lg font-semibold tracking-tight">
                      About this course
                    </h2>
                    <p className="text-[15px] leading-7 text-foreground/80">
                      {course?.data.description}
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque aliquam earum laudantium. Impedit voluptatibus quibusdam id neque possimus? Odit voluptas facilis iure, iusto itaque modi minima eveniet alias rerum porro ab quia impedit optio repellat nemo illum laudantium atque! Tenetur quo itaque voluptas quis architecto natus, quod aperiam. Inventore eum, maxime delectus tempora animi sed molestias quis fuga ut laudantium illum, eligendi eius error. Maiores aut architecto numquam recusandae cupiditate quam, possimus sequi qui odit explicabo facilis consequatur, perspiciatis eius eos tempore provident nam fugiat praesentium aliquam cumque sint tenetur laudantium nihil! Veniam velit voluptatem nobis laborum saepe magnam odio?
                    </p>
                  </section>

                  {/* Outcomes + Requirements */}
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
                    <section className="space-y-3">
                      <h2 className="text-lg font-semibold tracking-tight">
                        What you&apos;ll learn
                      </h2>
                      <ul className="space-y-2.5">
                        {course?.data.outcomes.map((outcome: Outcome) => (
                          <li key={outcome.id} className="flex items-start gap-2.5">
                            <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                            <span className="text-sm leading-6 text-foreground/80">
                              {outcome.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section className="space-y-3">
                      <h2 className="text-lg font-semibold tracking-tight">
                        Requirements
                      </h2>
                      <ul className="space-y-2.5">
                        {course?.data.requirements.map((requirement: Requirement) => (
                          <li key={requirement.id} className="flex items-start gap-2.5">
                            <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                            <span className="text-sm leading-6 text-foreground/80">
                              {requirement.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  {/* Course content */}
                  <section className="space-y-4">
                    <div className="space-y-1">
                      <h2 className="text-lg font-semibold tracking-tight">
                        Curriculum preview
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Take a look inside before you enroll. Preview lessons are free to watch.
                      </p>
                    </div>
                    <CourseContent />
                  </section>

                  <Separator />

                  {/* Instructor */}
                  <section className="space-y-4">
                    <h2 className="text-lg font-semibold tracking-tight">Instructor</h2>
                    <div className="flex flex-col gap-4 rounded-xl border p-5 sm:flex-row sm:items-center sm:gap-5">
                      <Avatar className="h-14 w-14 shrink-0">
                        <AvatarImage
                          src={instructorAvatar || "/placeholder.svg"}
                          alt={course?.data.instructor.username}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-primary text-lg text-primary-foreground">
                          {course?.data.instructor.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0 flex-1 space-y-2">
                        <div>
                          <p className="truncate text-[15px] font-semibold hover:text-primary hover:underline">
                            {course?.data.instructor.username}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Senior Software Engineer & Educator
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span className="font-medium text-foreground">4.8</span> (1.2k ratings)
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5" />
                            200 students
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <BookOpen className="h-3.5 w-3.5" />
                            14 courses
                          </span>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* FAQ */}
                  <section className="space-y-4">
                    <div className="space-y-1">
                      <h2 className="text-lg font-semibold tracking-tight">
                        Frequently asked questions
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Everything you need to know before starting.
                      </p>
                    </div>
                    <Accordion
                      type="single"
                      collapsible
                      className="overflow-hidden rounded-xl border bg-card px-5"
                    >
                      {course?.data.faqs.map((faq: Faq) => (
                        <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                          <AccordionTrigger className="py-4 text-left text-sm font-semibold hover:no-underline">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="pb-4 text-sm leading-6 text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </section>

                  <Separator />

                  <CourseReview />
                </div>
              </div>

              <aside className="lg:w-[340px] lg:shrink-0">
                <div className="lg:sticky lg:top-20">
                  <CourseCheckoutSidebar />
                </div>
              </aside>
            </div>
          </main>
          <Footer />
        </Fragment>}
    </Fragment>
  );
};

export default CourseDetailPage;
