import z from "zod/v3";

export const Visibility = z.enum(["PRIVATE", "PUBLIC", "SUSPENDED"], {
    errorMap: () => ({ message: "Course Visibility must be one of: PRIVATE, PUBLIC, SUSPENDED" }),
})

export type Visibility = z.infer<typeof Visibility>