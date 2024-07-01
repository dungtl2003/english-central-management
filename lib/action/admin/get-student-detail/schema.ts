import {z} from "zod";

export const RequestSchema = z.object({
    studentId: z.string(),
});
