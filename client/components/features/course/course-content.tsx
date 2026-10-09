"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Lock, PlayCircle } from "lucide-react";
import { useState } from "react";

type Lesson = {
  id: number;
  title: string;
  duration: string;
  isPreview?: boolean;
  type?: "video" | "article";
};

type Section = {
  id: number;
  title: string;
  lessons: Lesson[];
};

const dummySections: Section[] = [
  {
    id: 1,
    title: "Getting Started",
    lessons: [
      { id: 1, title: "Welcome and course overview", duration: "06:24", isPreview: true },
      { id: 2, title: "Setting up your workspace", duration: "12:10", isPreview: true },
      { id: 3, title: "How to get the most out of this course", duration: "08:45" },
    ],
  },
  {
    id: 2,
    title: "Core Fundamentals",
    lessons: [
      { id: 4, title: "Understanding the building blocks", duration: "18:32" },
      { id: 5, title: "Your first hands-on project", duration: "24:15" },
      { id: 6, title: "Common mistakes and how to avoid them", duration: "14:08" },
      { id: 7, title: "Section quiz and recap", duration: "10:00", type: "article" },
    ],
  },
  {
    id: 3,
    title: "Intermediate Techniques",
    lessons: [
      { id: 8, title: "Working with real-world data", duration: "21:47" },
      { id: 9, title: "Patterns used in production", duration: "19:33" },
      { id: 10, title: "Guided exercise: refactor together", duration: "26:20" },
    ],
  },
  {
    id: 4,
    title: "Advanced Topics",
    lessons: [
      { id: 11, title: "Performance and best practices", duration: "22:11" },
      { id: 12, title: "Testing your work with confidence", duration: "17:54" },
    ],
  },
  {
    id: 5,
    title: "Capstone and Next Steps",
    lessons: [
      { id: 13, title: "Capstone project walkthrough", duration: "28:40" },
      { id: 14, title: "Where to go from here", duration: "09:16", type: "article" },
    ],
  },
];

const totalLessons = dummySections.reduce((acc, s) => acc + s.lessons.length, 0);

const CourseContent = () => {
  const allValues = dummySections.map((s) => `section-${s.id}`);
  const [openValues, setOpenValues] = useState<string[]>(["section-1"]);
  const allExpanded = openValues.length === dummySections.length;

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b px-5 py-4">
        <p className="text-sm text-muted-foreground">
          {dummySections.length} sections &bull; {totalLessons} lessons &bull; 3h 30m total length
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 shrink-0 px-3 text-sm font-medium"
          onClick={() => setOpenValues(allExpanded ? [] : allValues)}
        >
          {allExpanded ? "Collapse all" : "Expand all"}
        </Button>
      </div>

      <Accordion
        type="multiple"
        value={openValues}
        onValueChange={setOpenValues}
        className="divide-y"
      >
        {dummySections.map((section, index) => (
          <AccordionItem
            key={section.id}
            value={`section-${section.id}`}
            className="border-b-0 px-5"
          >
            <AccordionTrigger className="gap-3 py-3.5 text-left hover:no-underline">
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">
                  {section.title}
                </span>
                <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                  {section.lessons.length} lessons
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-2">
              <ul className="-mx-1 space-y-0.5">
                {section.lessons.map((lesson) => (
                  <li
                    key={lesson.id}
                    className="group flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/60"
                  >
                    {lesson.isPreview ? (
                      <PlayCircle className="h-4 w-4 shrink-0 text-primary" />
                    ) : lesson.type === "article" ? (
                      <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                    ) : (
                      <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                    <span className="min-w-0 flex-1 truncate text-sm text-foreground/90">
                      {lesson.title}
                    </span>
                    {lesson.isPreview && (
                      <Badge
                        variant="outline"
                        className="hidden shrink-0 border-primary/30 text-xs font-medium text-primary sm:inline-flex"
                      >
                        Preview
                      </Badge>
                    )}
                    <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                      {lesson.duration}
                    </span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CourseContent;
