import z from "zod/v3";

export const Difficulty = z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCE"], {
    errorMap: () => ({ message: "Course Difficulty must be one of: BEGINNER, INTERMEDIATE, ADVANCE" }),
})

export type Difficulty = z.infer<typeof Difficulty>