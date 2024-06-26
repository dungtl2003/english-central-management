import {z} from "zod";

export const RequestSchema = z
    .object({
        id: z.string(),
        role: z.string(),
    })
    .strict();
