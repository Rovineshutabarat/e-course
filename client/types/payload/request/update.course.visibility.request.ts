import { Visibility } from "@/types/enums/visibility";
import z from "zod/v3";

export const UpdateCourseVisibilityRequest = z.object({
    visibility: Visibility
})

export type UpdateCourseVisibilityRequest = z.infer<typeof UpdateCourseVisibilityRequest>