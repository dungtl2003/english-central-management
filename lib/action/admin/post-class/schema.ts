import {z} from "zod";

export const RequestSchema = z.object({
    unitId: z.string(),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
    teacherId: z.string(),
});
