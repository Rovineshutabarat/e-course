import z from "zod/v3";

export const Requirement = z.object({
    name: z.string()
        .min(5, "Requirement name must be at least 5 characters long.")
        .max(150, "Requirement name must not be longer than 150 characters."),
});

export type Requirement = z.infer<typeof Requirement>
