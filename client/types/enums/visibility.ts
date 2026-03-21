import z from "zod/v3";

export const Visibility = z.enum(["DRAFT", "PUBLISHED", "SUSPENDED"], {
    errorMap: () => ({ message: "Course Visibility must be one of: DRAFT, PUBLISHED, SUSPENDED" }),
})

export type Visibility = z.infer<typeof Visibility>