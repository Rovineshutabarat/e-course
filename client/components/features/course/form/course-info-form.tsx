"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { LucideArrowRight } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

import { Combobox } from "@/components/shared/combobox";
import { CategoryService } from "@/services/category.service";
import { useCourseFormStore } from "@/store/course.form.store";
import { Category } from "@/types/entity/category";
import { CourseRequest } from "@/types/payload/request/course.request";
import z from "zod/v3";
import CreateCategoryDialog from "../../category/create-category-dialog";

const CourseInfoRequest = CourseRequest.pick({
  title: true,
  description: true,
  categoryId: true,
  price: true,
});

type CourseInfoRequest = z.infer<typeof CourseInfoRequest>;

const CourseInfoForm = () => {
  const { data, setData, setCurrentTab, subscribeReset } = useCourseFormStore();


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CourseInfoRequest>({
    resolver: zodResolver(CourseInfoRequest),
    defaultValues: {
      title: data?.title ?? "",
      description: data?.description ?? "",
      categoryId: data?.categoryId ?? 0,
      price: data?.price ?? 0,
    },
  });

  React.useEffect(() => {
    subscribeReset(() => {
      reset({
        title: "",
        description: "",
        categoryId: 0,
        price: 0,
      });
    });
  }, [reset]);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoryService.getAllCategories,
  });

  const categoryId = watch("categoryId");

  const onSubmit: SubmitHandler<CourseInfoRequest> = (values) => {
    setData(values);
    localStorage.setItem("course_form_current_tab", JSON.stringify(2));
    setCurrentTab(2);
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
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g. Advanced React Development"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your course..."
                className="min-h-[120px]"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category & Pricing</CardTitle>
            <CardDescription>
              Select a category and set the price for your course.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 w-full">
                <Label>Category</Label>
                <Combobox
                  placeholder="Category"
                  contents={(categories?.data ?? []).map(
                    (category: Category) => ({
                      label: category.name,
                      value: category.id,
                    }),
                  )}
                  value={categoryId || null}
                  onValueChange={(val) => setValue("categoryId", val!)}
                  actionComponent={<CreateCategoryDialog />}
                />
                {errors.categoryId && (
                  <p className="text-sm text-destructive">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="space-y-2 w-full">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter course price in USD"
                  {...register("price", { valueAsNumber: true })}
                />
                {errors.price && (
                  <p className="text-sm text-destructive">
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-end">
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

export default CourseInfoForm;
