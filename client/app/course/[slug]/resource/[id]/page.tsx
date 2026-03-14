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
import { useParams, useRouter } from "next/navigation";
import { Fragment, useState } from "react";

import CourseCurriculum from "@/components/features/course/course-curriculum";
import CourseDetailNavbar from "@/components/features/course/course-detail-navbar";
import CourseDiscussion from "@/components/features/course/course-discussion";
import Footer from "@/components/features/main/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const CourseResourcePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("description");

  const params = useParams();
  const courseId = Number(params?.id);

  return (
    <Fragment>
      <div className="bg-muted border-b shadow-sm">
        <CourseDetailNavbar />
      </div>

      <main className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-2/3 space-y-6">
            <div className="w-full">
              <div className="relative w-full h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-xl">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20240628161854/Best-courses-for-Java-Backend.webp"
                  alt="Course Background"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-105"
                />
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 bg-card">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
                <TabsTrigger value="quiz">Generate Quiz</TabsTrigger>
                <TabsTrigger value="summary">Generate Summary</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="p-4">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">
                      Advanced Figma Techniques
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
                        English
                      </Badge>

                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Globe className="h-3 w-3" />
                        Beginner
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Alias nesciunt nam iusto officia quisquam sit dicta
                    corporis, magnam corrupti quia dolorem quasi provident ut
                    sapiente, ipsam sequi unde ea molestiae odit mollitia eos
                    sunt soluta, repellat suscipit. Ullam, quidem. Reiciendis
                    voluptatum ad temporibus cumque possimus itaque, aliquam
                    perferendis tenetur ipsum!
                  </section>

                  <section className="p-6 border rounded-xl bg-slate-50/50 dark:bg-slate-900/20 space-y-4">
                    <h3 className="text-xl font-bold tracking-tight">
                      What You'll Learn
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                      {[
                        "Understand the core concepts of the topic",
                        "Apply the knowledge through practical examples",
                        "Build real-world skills step by step",
                        "Best practices and industry standards",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                          <span className="text-sm text-muted-foreground leading-relaxed">
                            {item}
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
                      {[
                        "Basic understanding of the subject",
                        "A computer with internet access",
                        "Willingness to learn and practice",
                      ].map((req, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-muted-foreground"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-bold tracking-tight">
                      Instructor
                    </h3>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-1">
                      <Avatar className="h-20 w-20 ring-2 ring-offset-2 ring-primary/10">
                        <AvatarImage
                          src="/placeholder.svg"
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                          RH
                        </AvatarFallback>
                      </Avatar>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-lg font-bold text-primary underline-offset-4 hover:underline cursor-pointer">
                            Rovines Hutabarat
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
                      {[
                        {
                          q: "Who is this course for?",
                          a: "This course is suitable for beginners who want to learn the fundamentals as well as learners who want to strengthen their existing knowledge.",
                        },
                        {
                          q: "Do I need prior experience?",
                          a: "No prior experience is required. The material starts from the basics and gradually moves to more advanced concepts.",
                        },
                        {
                          q: "Will I get practical examples?",
                          a: "Yes. The course includes practical examples and exercises to help you apply what you learn in real situations.",
                        },
                      ].map((item, idx) => (
                        <AccordionItem
                          key={idx}
                          value={`item-${idx}`}
                          className="px-4 border-b last:border-0"
                        >
                          <AccordionTrigger className="hover:no-underline hover:text-primary py-4 text-left font-semibold">
                            {item.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                            {item.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </section>
                </div>
              </TabsContent>

              <TabsContent value="discussions" className="space-y-6">
                <CourseDiscussion />
              </TabsContent>

              <TabsContent value="quiz" className="space-y-6"></TabsContent>
              <TabsContent value="summary" className="space-y-6"></TabsContent>
            </Tabs>
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-12">
              <CourseCurriculum />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </Fragment>
  );
};

export default CourseResourcePage;
