import {z} from "zod";

export const RequestSchema = z.object({
    id: z.string().nullable().optional(),
    role: z.string(),
});
