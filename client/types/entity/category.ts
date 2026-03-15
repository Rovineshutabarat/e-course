import z from "zod/v3";

export const Category = z.object({
  id: z.number().optional(),
  name: z
    .string({ required_error: "Category name cannot be blank." })
    .min(5, "Category name must be at least 5 characters long.")
    .max(50, "Category name must not be longer than 50 characters."),
});

export type Category = z.infer<typeof Category>;
