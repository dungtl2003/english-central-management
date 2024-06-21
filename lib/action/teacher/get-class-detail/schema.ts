import {z} from "zod";

export const RequestSchema = z.object({
    classId: z.string(),
});
