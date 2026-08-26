import { Faq } from "@/types/entity/faq";
import { Outcome } from "@/types/entity/outcome";
import { Requirement } from "@/types/entity/requirement";
import { Difficulty } from "@/types/enums/difficulty";
import { Visibility } from "@/types/enums/visibility";
import { z } from "zod/v3";

export const CourseRequest = z.object({
  title: z.string()
    .min(5, "Course name must be between 5 and 150 characters.")
    .max(150, "Course name must be between 5 and 150 characters."),
  description: z.string()
    .min(50, "Description must be at least 50 characters."),
  price: z.number()
    .min(0, "Price must be greater than or equal to 0."),
  categoryId: z.number({ required_error: "Category is required." }),
  difficulty: Difficulty,
  visibility: Visibility,
  language: z.string()
    .min(1, "Language cannot be blank.")
    .max(50, "Language must not be longer than 50 characters."),
  requirements: z.array(Requirement)
    .min(1, "Requirements cannot be empty."),
  outcomes: z.array(Outcome)
    .min(1, "Outcomes cannot be empty."),
  faqs: z.array(Faq)
    .min(1, "Faqs cannot be empty."),
  image: z.instanceof(File, { message: "Image is required." }),
  wallpaper: z.instanceof(File, { message: "Wallpaper is required." }),
});

export type CourseRequest = z.infer<typeof CourseRequest>;
