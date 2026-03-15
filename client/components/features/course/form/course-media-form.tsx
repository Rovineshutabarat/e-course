"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { LucideArrowLeft } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCourseFormStore } from "@/store/course.form.store";
import { CourseRequest } from "@/types/payload/request/course.request";
import z from "zod/v3";

const CourseMediaRequest = CourseRequest.pick({
  image: true,
});

type CourseMediaRequest = z.infer<typeof CourseMediaRequest>;
const CourseMediaForm = () => {
  const { data, reset, subscribeReset, setCurrentTab } = useCourseFormStore();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<CourseMediaRequest>({
    resolver: zodResolver(CourseMediaRequest),
    defaultValues: {
      image: data?.image ?? "",
    },
  });

  React.useEffect(() => {
    subscribeReset(() => {
      resetForm({ image: "" });
    });
  }, [resetForm]);

  //   const createCourseMutation = useMutation({
  //     mutationKey: ["create_course_mutation"],
  //     mutationFn: (data: CourseRequest) => CourseService.createCourse(data),
  //     onSuccess: () => {
  //       toast.success("Success creating course");
  //       reset();
  //     },
  //     onError: () => toast.error("Failed to create course"),
  //     onSettled: async () => {
  //       reset();
  //       return await queryClient.invalidateQueries({ queryKey: ["courses"] });
  //     },
  //   });

  const onSubmit: SubmitHandler<CourseMediaRequest> = (params) => {
    const mergedData = { ...data, ...params };
    // createCourseMutation.mutate(mergedData as CourseRequest);
    console.log(mergedData);
  };

  return (
    <div className="space-y-6 mt-5">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the basic information of your course.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Image */}
            <div className="space-y-1">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                placeholder="Image url"
                {...register("image")}
              />
              <p className="text-sm text-muted-foreground">
                The image of your course.
              </p>
              {errors.image && (
                <p className="text-sm text-destructive">
                  {errors.image.message}
                </p>
              )}
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
            <Button
              type="submit"
              className="cursor-pointer"
              //   disabled={createCourseMutation.isPending}
            >
              {/* {createCourseMutation.isPending ? "Saving..." : "Save Course"} */}
              Save Course
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default CourseMediaForm;
