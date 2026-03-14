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
import { cn } from "@/lib/utils";
import { Bookmark, Download, PlayIcon, Plus } from "lucide-react";
import React from "react";

type Resource = {
  id: number;
  title: string;
  url: string;
  resourceType: "VIDEO";
};

type Module = {
  id: number;
  title: string;
  resources: Resource[];
};

const dummyModules: Module[] = [
  {
    id: 1,
    title: "Introduction",
    resources: [
      {
        id: 1,
        title: "Welcome to the Course",
        url: "/video1.mp4",
        resourceType: "VIDEO",
      },
      {
        id: 2,
        title: "Course Overview",
        url: "/video2.mp4",
        resourceType: "VIDEO",
      },
    ],
  },
  {
    id: 2,
    title: "Core Concepts",
    resources: [
      {
        id: 3,
        title: "Understanding Basics",
        url: "/video3.mp4",
        resourceType: "VIDEO",
      },
      {
        id: 4,
        title: "First Practical Example",
        url: "/video4.mp4",
        resourceType: "VIDEO",
      },
      { id: 5, title: "Deep Dive", url: "/video5.mp4", resourceType: "VIDEO" },
    ],
  },
];

const CourseCurriculum = () => {
  const [currentResource, setCurrentResource] = React.useState<Resource | null>(
    dummyModules[0].resources[0],
  );

  const modules = dummyModules;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Course Content</CardTitle>
        <div className="flex items-center justify-between">
          <CardDescription>
            {modules.length} modules •{" "}
            {modules.reduce((acc, m) => acc + m.resources.length, 0)} lessons
          </CardDescription>
          <div className="text-sm">
            <span className="font-medium">10%</span> complete
          </div>
        </div>
      </CardHeader>

      <CardContent className="max-h-[calc(100vh-200px)] overflow-y-auto">
        <Accordion type="multiple" className="w-full">
          {modules.map((module) => (
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
                  {module.resources.map((resource) => (
                    <div
                      key={resource.id}
                      className={cn(
                        "flex items-center gap-2 p-2 rounded-md text-sm hover:bg-muted/50 cursor-pointer",
                        currentResource?.id === resource.id && "bg-muted",
                      )}
                      onClick={() => setCurrentResource(resource)}
                    >
                      <PlayIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span className="flex-1 truncate">{resource.title}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>

      <CardFooter className="flex-col gap-4 pt-2">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Resources
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="h-4 w-4 mr-1" />
              Bookmarks
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Notes
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCurriculum;
