import z from "zod/v3";

export const Faq = z.object({
    id: z.number().optional(),
    question: z.string()
        .min(10, "Question must be at least 10 characters long.")
        .max(255, "Question must not be longer than 255 characters."),
    answer: z.string()
        .min(10, "Answer must be at least 10 characters long."),
});

export type Faq = z.infer<typeof Faq>