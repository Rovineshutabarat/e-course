"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LucideArrowLeft, LucideArrowRight, Plus, Trash2 } from "lucide-react";
import React from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCourseFormStore } from "@/store/course.form.store";
import { CourseRequest } from "@/types/payload/request/course.request";
import z from "zod/v3";

const CourseDetailRequest = CourseRequest.pick({
  visibility: true,
  difficulty: true,
  requirements: true,
  outcomes: true,
  faqs: true,
});

type CourseDetailRequest = z.infer<typeof CourseDetailRequest>;

const CourseDetailForm = () => {
  const { data, setData, setCurrentTab, subscribeReset } = useCourseFormStore();

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    register,
    control,
    formState: { errors },
  } = useForm<CourseDetailRequest>({
    resolver: zodResolver(CourseDetailRequest),
    defaultValues: {
      visibility: data?.visibility ?? "PRIVATE",
      difficulty: data?.difficulty ?? "BEGINNER",
      requirements: data?.requirements ?? [{ name: "" }],
      outcomes: data?.outcomes ?? [{ name: "" }],
      faqs: data?.faqs ?? [{ question: "", answer: "" }],
    },
  });

  const {
    fields: requirementFields,
    append: appendRequirement,
    remove: removeRequirement,
  } = useFieldArray({ control, name: "requirements" });

  const {
    fields: outcomeFields,
    append: appendOutcome,
    remove: removeOutcome,
  } = useFieldArray({ control, name: "outcomes" });

  const {
    fields: faqFields,
    append: appendFaq,
    remove: removeFaq,
  } = useFieldArray({ control, name: "faqs" });

  React.useEffect(() => {
    subscribeReset(() => {
      reset({
        visibility: undefined,
        difficulty: undefined,
        requirements: [{ name: "" }],
        outcomes: [{ name: "" }],
        faqs: [{ question: "", answer: "" }],
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
              Set the course difficulty level and choose who can see your course.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 w-full">
                <Label>Difficulty</Label>
                <Select
                  onValueChange={(val) => setValue("difficulty", val as CourseDetailRequest["difficulty"])}
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
                  <p className="text-sm text-destructive">{errors.difficulty.message}</p>
                )}
              </div>

              <div className="space-y-2 w-full">
                <Label>Visibility</Label>
                <Select
                  onValueChange={(val) => setValue("visibility", val as CourseDetailRequest["visibility"])}
                  value={visibility ?? ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select course visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Course Visibility</SelectLabel>
                      <SelectItem value="PRIVATE">Private</SelectItem>
                      <SelectItem value="PUBLIC">Public</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Decide whether your course is private, or public.
                </p>
                {errors.visibility && (
                  <p className="text-sm text-destructive">{errors.visibility.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Requirements</CardTitle>
            <CardDescription>
              List the prerequisites students need before taking this course.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {requirementFields.map((field, index) => (
              <div key={field.id} className="space-y-1">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder={`Requirement ${index + 1}`}
                    {...register(`requirements.${index}.name`)}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    disabled={requirementFields.length === 1}
                    onClick={() => removeRequirement(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                {errors.requirements?.[index]?.name && (
                  <p className="text-sm text-destructive">
                    {errors.requirements[index].name.message}
                  </p>
                )}
              </div>
            ))}
            {errors.requirements?.root && (
              <p className="text-sm text-destructive">{errors.requirements.root.message}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => appendRequirement({ name: "" })}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Requirement
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Outcomes</CardTitle>
            <CardDescription>
              Describe what students will learn or achieve after completing this course.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {outcomeFields.map((field, index) => (
              <div key={field.id} className="space-y-1">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder={`Outcome ${index + 1}`}
                    {...register(`outcomes.${index}.name`)}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    disabled={outcomeFields.length === 1}
                    onClick={() => removeOutcome(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                {errors.outcomes?.[index]?.name && (
                  <p className="text-sm text-destructive">
                    {errors.outcomes[index].name.message}
                  </p>
                )}
              </div>
            ))}
            {errors.outcomes?.root && (
              <p className="text-sm text-destructive">{errors.outcomes.root.message}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => appendOutcome({ name: "" })}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Outcome
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>FAQs</CardTitle>
            <CardDescription>
              Answer common questions students might have about this course.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqFields.map((field, index) => (
              <div key={field.id} className="space-y-2 border rounded-md p-4">
                <div className="flex items-center justify-between">
                  <Label>FAQ {index + 1}</Label>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    disabled={faqFields.length === 1}
                    onClick={() => removeFaq(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Input
                  placeholder="Question"
                  {...register(`faqs.${index}.question`)}
                />
                {errors.faqs?.[index]?.question && (
                  <p className="text-sm text-destructive">{errors.faqs[index].question.message}</p>
                )}
                <Textarea
                  placeholder="Answer"
                  {...register(`faqs.${index}.answer`)}
                />
                {errors.faqs?.[index]?.answer && (
                  <p className="text-sm text-destructive">{errors.faqs[index].answer.message}</p>
                )}
              </div>
            ))}
            {errors.faqs && (
              <p className="text-sm text-destructive">{errors.faqs.message}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => appendFaq({ question: "", answer: "" })}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add FAQ
            </Button>
          </CardFooter>
        </Card>

        <div className="flex items-center justify-end gap-3">
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
        </div>
      </form>
    </div>
  );
};

export default CourseDetailForm;