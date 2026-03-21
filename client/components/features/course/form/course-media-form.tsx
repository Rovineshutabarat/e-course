"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LucideArrowLeft, Upload, X } from "lucide-react";
import React, { useRef, useState } from "react";
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
import { CourseService } from "@/services/course.service";
import { useCourseFormStore } from "@/store/course.form.store";
import { CourseRequest } from "@/types/payload/request/course.request";
import { toast } from "sonner";
import z from "zod/v3";

const CourseMediaRequest = CourseRequest.pick({
  image: true,
  wallpaper: true,
});

type CourseMediaRequest = z.infer<typeof CourseMediaRequest>;

const ImageUploadField = ({
  label,
  description,
  error,
  onChange,
  preview,
  onClear,
}: {
  label: string;
  description: string;
  error?: string;
  onChange: (file: File) => void;
  preview: string | null;
  onClear: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <div
        className="border-2 border-dashed rounded-lg overflow-hidden cursor-pointer hover:border-primary transition-colors"
        onClick={() => !preview && inputRef.current?.click()}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt={label}
              className="w-full h-48 object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 h-48 text-muted-foreground">
            <Upload className="w-8 h-8" />
            <p className="text-sm">Click to upload</p>
            <p className="text-xs">PNG, JPG, WEBP</p>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onChange(file);
        }}
      />
      <p className="text-sm text-muted-foreground">{description}</p>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

const CourseMediaForm = () => {
  const { data, reset, subscribeReset, setCurrentTab } = useCourseFormStore();
  const queryClient = useQueryClient();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [wallpaperPreview, setWallpaperPreview] = useState<string | null>(null);

  const {
    handleSubmit,
    setValue,
    reset: resetForm,
    formState: { errors },
  } = useForm<CourseMediaRequest>({
    resolver: zodResolver(CourseMediaRequest),
  });

  React.useEffect(() => {
    subscribeReset(() => {
      resetForm();
      setImagePreview(null);
      setWallpaperPreview(null);
    });
  }, [resetForm]);

  const handleFileChange = (
    field: keyof CourseMediaRequest,
    file: File,
    setPreview: (url: string) => void
  ) => {
    setValue(field, file as any, { shouldValidate: true });
    setPreview(URL.createObjectURL(file));
  };

  const handleClear = (
    field: keyof CourseMediaRequest,
    setPreview: (url: string | null) => void
  ) => {
    setValue(field, undefined as any);
    setPreview(null);
  };

  const createCourseMutation = useMutation({
    mutationKey: ["create_course"],
    mutationFn: (data: FormData) => CourseService.createCourse(data),
    onSuccess: () => {
      toast.success("Success creating course")
      reset()
    }, onError: () => {
      toast.error("Failed to create course")
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  })

  const onSubmit: SubmitHandler<CourseMediaRequest> = (params) => {
    const mergedData = { ...data, ...params };
    const formData = new FormData();

    Object.entries(mergedData).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          Object.entries(item).forEach(([itemKey, itemValue]) => {
            formData.append(`${key}[${index}].${itemKey}`, String(itemValue));
          });
        });
      } else if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });
    createCourseMutation.mutate(formData);
  };

  return (
    <div className="space-y-6 mt-5">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Course Media</CardTitle>
            <CardDescription>
              Upload the image and wallpaper for your course.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ImageUploadField
              label="Course Image"
              description="The thumbnail image of your course. Recommended size: 400x300px."
              error={errors.image?.message}
              preview={imagePreview}
              onChange={(file) => handleFileChange("image", file, setImagePreview)}
              onClear={() => handleClear("image", setImagePreview)}
            />
            <ImageUploadField
              label="Course Wallpaper"
              description="The banner/wallpaper of your course. Recommended size: 1280x720px."
              error={errors.wallpaper?.message}
              preview={wallpaperPreview}
              onChange={(file) => handleFileChange("wallpaper", file, setWallpaperPreview)}
              onClear={() => handleClear("wallpaper", setWallpaperPreview)}
            />
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
              Save Course
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default CourseMediaForm;