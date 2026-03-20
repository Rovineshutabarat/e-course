"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCourseFormStore } from "@/store/course.form.store";
import { CourseRequest } from "@/types/payload/request/course.request";
import z from "zod/v3";

const CourseDetailRequest = CourseRequest.pick({
  visibility: true,
  difficulty: true,
});

type CourseDetailRequest = z.infer<typeof CourseDetailRequest>;

const CourseDetailForm = () => {
  const { data, setData, setCurrentTab, subscribeReset } = useCourseFormStore();

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CourseDetailRequest>({
    resolver: zodResolver(CourseDetailRequest),
    defaultValues: {
      visibility: data?.visibility ?? undefined,
      difficulty: data?.difficulty ?? undefined,
    },
  });

  React.useEffect(() => {
    subscribeReset(() => {
      reset({
        visibility: undefined,
        difficulty: undefined,
      });
    });
  }, [reset]);

  const difficulty = watch("difficulty");
  const visibility = watch("visibility");

  const onSubmit: SubmitHandler<CourseDetailRequest> = (values) => {
    setData(values);
    localStorage.setItem("course_form_current_tab", JSON.stringify(3));
    setCurrentTab(3);
  };

  return (
    <div className="space-y-6 mt-5">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Difficulty & Visibility</CardTitle>
            <CardDescription>
              Set the course difficulty level and choose who can see your
              course.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Difficulty */}
              <div className="space-y-1 w-full">
                <Label>Difficulty</Label>
                <Select
                  onValueChange={(val) =>
                    setValue(
                      "difficulty",
                      val as CourseDetailRequest["difficulty"],
                    )
                  }
                  value={difficulty ?? ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select course difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Course Difficulty</SelectLabel>
                      <SelectItem value="BEGINNER">Beginner</SelectItem>
                      <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                      <SelectItem value="ADVANCED">Advanced</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose the level that matches your course content.
                </p>
                {errors.difficulty && (
                  <p className="text-sm text-destructive">
                    {errors.difficulty.message}
                  </p>
                )}
              </div>

              {/* Visibility */}
              <div className="space-y-1 w-full">
                <Label>Visibility</Label>
                <Select
                  onValueChange={(val) =>
                    setValue(
                      "visibility",
                      val as CourseDetailRequest["visibility"],
                    )
                  }
                  value={visibility ?? ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select course visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Course Visibility</SelectLabel>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="PRIVATE">Private</SelectItem>
                      <SelectItem value="PUBLIC">Public</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Decide whether your course is draft, private, or public.
                </p>
                {errors.visibility && (
                  <p className="text-sm text-destructive">
                    {errors.visibility.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex space-x-4 items-center justify-end">
            <Button
              type="button"
              onClick={() => setCurrentTab(1)}
              className="cursor-pointer"
              variant="outline"
            >
              <LucideArrowLeft />
              Previous Step
            </Button>
            <Button type="submit" className="cursor-pointer">
              Next Step
              <LucideArrowRight />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default CourseDetailForm;
