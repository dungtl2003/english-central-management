import {z} from "zod";

export const RequestSchema = z.object({
    teacherId: z.string(),
    classId: z.string(),
});
