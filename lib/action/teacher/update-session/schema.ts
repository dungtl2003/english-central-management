import {z} from "zod";

export const RequestSchema = z
    .object({
        sessionId: z.string(),
        actualTime: z.coerce.date(),
    })
    .strict();
