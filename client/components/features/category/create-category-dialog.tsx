"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CategoryService } from "@/services/category.service";
import { Category } from "@/types/entity/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateCategoryDialog = () => {
  const queryClient = useQueryClient();

  const [open, setOpen] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Category>({
    resolver: zodResolver(Category),
  });

  const categoryMutation = useMutation({
    mutationKey: ["category_mutation"],
    mutationFn: (data: Category) => CategoryService.createCategory(data),
    onSuccess: () => setOpen(false),
    onError: () => toast.error("Failed to create category"),
    onSettled: async () => {
      reset();
      return await queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const onSubmit: SubmitHandler<Category> = (data) => {
    categoryMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full cursor-pointer">
          <Plus />
          Add a new category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            handleSubmit(onSubmit)(e);
          }}
          className="gap-y-4 flex flex-col"
        >
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
            <DialogDescription>
              Fill out the category name below. Click <strong>Save</strong> to
              add it to the list.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              placeholder="e.g. Web Development"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-destructive text-sm">*{errors.name.message}</p>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={categoryMutation.isPending}>
              {categoryMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
