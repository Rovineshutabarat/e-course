import z from "zod/v3";

export const Outcome = z.object({
    name: z.string()
        .min(5, "Outcome name must be at least 5 characters long.")
        .max(150, "Outcome name must not be longer than 150 characters."),
});

export type Outcome = z.infer<typeof Outcome>