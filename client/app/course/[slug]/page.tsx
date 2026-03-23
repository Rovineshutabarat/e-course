"use client";

import {
  BookOpen,
  Check,
  Clock,
  FileText,
  Globe,
  PlayCircle,
  Star,
  Users,
} from "lucide-react";

import CourseCheckoutSidebar from "@/components/features/course/course-checkout-sidebar";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CourseService } from "@/services/course.service";
import { Faq } from "@/types/entity/faq";
import { Outcome } from "@/types/entity/outcome";
import { Requirement } from "@/types/entity/requirement";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { Fragment } from "react";

const CourseDetailPage = () => {

  const params = useParams()

  const slug: string = params.slug as string

  const { data: course, isLoading, isError } = useQuery({
    queryKey: [`course_${slug}`],
    queryFn: () => CourseService.getCourseBySlug(slug!),
  })

  if (isError) notFound()

  return (
    <Fragment>
      {isLoading ? <CourseDetailPageSkeleton /> :
        <Fragment>
          <div className="bg-muted border-b shadow-sm">
            <CourseDetailNavbar />
          </div>
          <main className="container mx-auto px-4 py-10">
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-2/3">
                <div className="space-y-10">
                  <div className="w-full">
                    <div className="relative w-full h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-xl">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${course?.data.wallpaper?.path}`}
                        alt={course?.data.wallpaper?.name || "Course wallpaper"}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">
                      {course?.data.title}
                    </h2>

                    <section className="flex flex-wrap gap-3">
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Clock className="h-3 w-3" />
                        20 hours
                      </Badge>

                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <BookOpen className="h-3 w-3" />
                        12 modules
                      </Badge>

                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <PlayCircle className="h-3 w-3" />
                        48 lessons
                      </Badge>

                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Users className="h-3 w-3" />
                        3,214 students
                      </Badge>

                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Star className="h-3 w-3" />
                        120 Review
                      </Badge>

                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Star className="h-3 w-3" />
                        4.8 rating
                      </Badge>
                    </section>

                    <section className="flex flex-wrap gap-3">
                      <Badge variant="secondary">Programming</Badge>

                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Globe className="h-3 w-3" />
                        {course?.data.difficulty}
                      </Badge>

                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <FileText className="h-3 w-3" />
                        Certificate
                      </Badge>
                    </section>
                  </div>

                  <section className="prose prose-sm max-w-none dark:prose-invert">
                    {course?.data.description}
                  </section>

                  <section className="p-6 border rounded-xl bg-slate-50/50 dark:bg-slate-900/20 space-y-4">
                    <h3 className="text-xl font-bold tracking-tight">
                      What You'll Learn
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                      {course?.data.outcomes.map((outcome: Outcome) => (
                        <div key={outcome.id} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                          <span className="text-sm text-muted-foreground leading-relaxed">
                            {outcome.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-bold tracking-tight">
                      Requirements
                    </h3>
                    <ul className="grid gap-2">
                      {course?.data.requirements.map((requirement: Requirement) => (
                        <li
                          key={requirement.id}
                          className="flex items-center gap-3 text-muted-foreground"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                          {requirement.name}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-bold tracking-tight">Instructor</h3>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-1">
                      <Avatar className="h-20 w-20">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}/${course?.data.instructor.image?.path}`}
                          alt={course?.data.instructor.image?.name || "avatar"}
                          fill
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                          {course?.data.instructor.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-lg font-bold text-primary underline-offset-4 hover:underline cursor-pointer">
                            {course?.data.instructor.username}
                          </h4>
                          <p className="text-sm text-muted-foreground font-medium">
                            Senior Software Engineer & Educator
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm">
                          <div className="flex items-center gap-1.5 font-medium">
                            <Star className="h-4 w-4 text-orange-500 fill-orange-500" />
                            <span>
                              4.8{" "}
                              <span className="text-muted-foreground font-normal">
                                (1.2k ratings)
                              </span>
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 font-medium">
                            <Users className="h-4 w-4 text-slate-300" />
                            <span>200 Students</span>
                          </div>
                          <div className="flex items-center gap-1.5 font-medium">
                            <BookOpen className="h-4 w-4 text-slate-300" />
                            <span>14 Courses</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-bold tracking-tight">
                      Frequently Asked Questions
                    </h3>
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full border rounded-lg overflow-hidden"
                    >
                      {course?.data.faqs.map((faq: Faq) => (
                        <AccordionItem
                          key={faq.id}
                          value={`item-${faq.id}`}
                          className="px-4 border-b last:border-0"
                        >
                          <AccordionTrigger className="hover:no-underline hover:text-primary py-4 text-left font-semibold">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </section>

                  <CourseReview />
                </div>
              </div>

              <div className="lg:w-1/3">
                <div className="sticky top-12">
                  <CourseCheckoutSidebar />
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </Fragment>}
    </Fragment>
  );
};

export default CourseDetailPage;
