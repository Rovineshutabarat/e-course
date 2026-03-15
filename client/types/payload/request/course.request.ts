import { z } from "zod/v3";

export const CourseRequest = z.object({
  title: z
    .string({ required_error: "Title is required." })
    .min(5, "Title must be at least 5 characters long.")
    .max(100, "Title must not be longer than 100 characters."),
  description: z
    .string({ required_error: "Description is required." })
    .min(10, "Description must be at least 10 characters long."),
  categoryId: z
    .number({ required_error: "Category is required." })
    .positive("Category is required."),
  price: z
    .number({ required_error: "Price is required." })
    .positive("Price must be zero or positive number."),
  difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"], {
    required_error: "Difficulty is required.",
  }),
  visibility: z.enum(["DRAFT", "PRIVATE", "PUBLIC"], {
    required_error: "Visibility is required.",
  }),
  image: z
    .string({ required_error: "Image URL is required." })
    .url("Image URL must be a valid URL."),
});

export type CourseRequest = z.infer<typeof CourseRequest>;
