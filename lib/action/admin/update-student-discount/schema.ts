import {z} from "zod";

export const RequestPayloadSchema = z.object({
    studentId: z.string(),
    discount: z.number(),
});
