"use client";

import CourseDetailForm from "@/components/features/course/form/course-detail-form";
import CourseInfoForm from "@/components/features/course/form/course-info-form";
import CourseMediaForm from "@/components/features/course/form/course-media-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCourseFormStore } from "@/store/course.form.store";
import { ArrowLeft, CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { currentTab, setCurrentTab } = useCourseFormStore();
  const { reset } = useCourseFormStore();

  const tabs = [
    {
      id: 1,
      title: "Course Information",
      content: <CourseInfoForm />,
    },
    {
      id: 2,
      title: "Course Details",
      content: <CourseDetailForm />,
    },
    {
      id: 3,
      title: "Course Media",
      content: <CourseMediaForm />,
    },
  ];

  function storedTab() {
    if (typeof window === "undefined") return 1;

    const stored = localStorage.getItem("course_form_current_tab");
    return stored ? Number(JSON.parse(stored)) : 1;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-6">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold tracking-tight">
            Create New Course
          </h2>
        </div>
        <Button
          variant="destructive"
          type="button"
          className="cursor-pointer"
          onClick={() => {
            reset();
          }}
        >
          Discard Changes
        </Button>
      </div>

      <Separator />

      <Tabs
        className="w-full"
        value={currentTab.toString()}
        onValueChange={(value) => setCurrentTab(Number(value))}
      >
        <TabsList className="grid w-full grid-cols-3  bg-card p-0 !h-14 rounded-xl">
          {tabs.map((tab, i) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id.toString()}
              disabled={tab.id > storedTab()}
              className="
        flex items-center justify-center gap-2 rounded-xl border-b-2 border-transparent
        py-3 text-sm text-muted-foreground
        data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:font-medium
        disabled:opacity-35 disabled:cursor-not-allowed
        cursor-pointer transition-colors
      "
            >
              <span
                className="
        w-5 h-5 rounded-full border border-current text-[11px] font-medium
        flex items-center justify-center shrink-0
        data-[state=active]:bg-primary data-[state=active]:border-primary data-[state=active]:text-white
      "
              >
                {tab.id < currentTab ? (
                  <CheckIcon className="w-3 h-3" />
                ) : (
                  tab.id
                )}
              </span>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => {
          return (
            <TabsContent
              key={tab.id}
              value={tab.id.toString()}
              forceMount
              className="hidden data-[state=active]:block"
            >
              {tab.content}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Page;
